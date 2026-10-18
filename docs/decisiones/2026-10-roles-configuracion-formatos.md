# Roles, configuración, formatos e inscripción (octubre 2026)

Registro de qué cambió en la API, por qué, y qué se eliminó. Leer antes de tocar
autenticación, permisos, `setting`, `document`, `schedule` o `section`.

Rama: `feat/estadisticas`. Frontend relacionado: `sigeit/docs/decisiones/2026-10-roles-configuracion-formatos.md`.

---

## 1. Autenticación y permisos

### 1.1 Clave del JWT desde el entorno
- **Antes:** `JWT_CONST.secret` era el texto fijo `'secret'`. Cualquiera podía firmar un token de administrador.
- **Ahora:** se lee de `JWT_SECRET` (`src/auth/jwt-auth/constants.ts`) en el momento de usarse, y `JwtModule` se registra con `registerAsync` para leerla cuando el `.env` ya está cargado. Sin la variable, la API no arranca.
- **Consecuencia:** cada entorno necesita su `JWT_SECRET` (documentado en `.env.example`). Cambiarla invalida todas las sesiones.

### 1.2 `req.user` vacío en toda la API
- **Antes:** `JwtAuthGuard.handleRequest` llamaba a `super.handleRequest(...)` sin `return`, así que `req.user` siempre era `undefined`. Por eso algunos controladores leían el id de la cookie (que el cliente puede alterar).
- **Ahora:** devuelve el usuario. Ningún controlador debe leer el id de la cookie.

### 1.3 Control por rol global (`src/auth/roles`)
- **Por qué:** solo `setting` y `document` comprobaban roles; en el resto, cualquier usuario con sesión (incluso un estudiante) podía crear, editar o borrar llamando a la API.
- **Cómo funciona `RolesGuard`** (APP_GUARD, corre después de `JwtAuthGuard`):
  1. Rutas `@Public()`: pasan sin comprobar.
  2. Carga el usuario del JWT **una vez** por petición (con `department`) y lo deja en `request.currentUser`.
  3. Usuario eliminado o inactivo → `403 "Inactive or deleted user."`, aunque el token siga vigente.
  4. Con `@AllowRoles(...)`: solo esos roles.
  5. **Sin `@AllowRoles`: lecturas para cualquier rol, escrituras solo para el Administrador.** Es *denegar por defecto*: una ruta nueva sin permisos queda cerrada, no abierta.
- **Grupos** (`roles.decorator.ts`): `PLANNING_ROLES` (Admin, Director, Jefe de departamento, Planificador), `TEACHER_ADMIN_ROLES` (Admin, Director, Jefe de departamento), `ANY_ROLE`.
- **`@CurrentUser()`** (`src/repositories/user/permissions.ts`): entrega el usuario ya cargado por el guard. No volver a consultarlo en el servicio.
- **`assertDepartmentScope(user, departmentId)`**: si el usuario es jefe de departamento y el recurso es de otro departamento → `403`. Los demás roles ya fueron filtrados por la ruta.

### 1.4 Matriz de permisos

| Recurso | Roles | Alcance extra |
|---|---|---|
| Escuelas, departamentos, carreras, materias, aulas, días, períodos, demanda, `PATCH /setting` | Admin (por defecto) | — |
| Usuarios (lectura y escritura), auditoría | Admin | — |
| Horarios: crear, bulk, editar, borrar | `PLANNING_ROLES` | Jefe: solo secciones de materias de su departamento (también al mover a otra sección) |
| Secciones: crear, editar, borrar, reporte Excel | `PLANNING_ROLES` | — |
| Estadísticas | `PLANNING_ROLES` | — |
| Profesores (escritura), historial de asignaturas, títulos y notas | `TEACHER_ADMIN_ROLES` | — |
| Formatos (`document`): crear, editar, borrar | Admin, Jefe | Jefe: solo su departamento |
| Correlativo: `PATCH /setting/department/:id` | Admin, Jefe | Jefe: solo su departamento |
| Reservar números de oficio | `PLANNING_ROLES` | Jefe: solo su departamento |
| Cambiar la propia contraseña | `ANY_ROLE` | — |
| Resto de lecturas | Cualquier rol con sesión | — |

### 1.5 Validación estricta (`src/common/validation/strict-validation.pipe.ts`)
- **Por qué:** el `ValidationPipe` global deja pasar campos que el DTO no declara. Con `{ ...guardado, ...dto }`, enviar `{"id": X}` en un PATCH sobrescribía otro registro saltándose permisos (asignación masiva).
- **Ahora:** `@Body(strictValidation)` / `@Query(strictValidation)` responden `400` ante cualquier campo no declarado. Se usa en `setting` y `document`. No se activó globalmente porque DTOs antiguos heredan propiedades de la entidad sin validadores.

---

## 2. Configuración (`src/repositories/setting`)

### 2.1 Configuración del instituto (fila única)
- `GET /setting`: devuelve la fila; si no existe la crea (07:00–18:00, 45 min, 5 min, nombre y siglas de la primera escuela). Nunca responde 404.
- `PATCH /setting`: Admin. Campos opcionales; `endTime > startTime` comparando con lo guardado si solo llega uno.
- **Nota:** son valores por defecto para crear períodos; el horario real sigue en cada `Period`.

### 2.2 Correlativo de oficios por departamento (`DepartmentSetting`)
- Una fila por departamento (`departmentId` único, columna explícita para filtrar y bloquear sin JOIN). Prefijo por defecto: siglas del departamento normalizadas a `^[A-Z0-9]{1,10}$`.
- `GET /setting/department` crea las filas que falten. `GET /setting/department/:id` devuelve `officeLastNumber = 0` si `officeYear` no es el año en curso (reinicio anual).
- `POST /setting/department/:id/office-numbers` es **el único punto que asigna números**:
  - Transacción con `pessimistic_write` (SELECT … FOR UPDATE): dos personas generando cartas a la vez nunca reciben el mismo número.
  - Sin `start`: `last+1 … last+count`. Con `start`: `start … start+count-1`.
  - `start <= último emitido` → `400` (repetiría números).
  - `year` fuera de `[último año emitido, año actual]` → `400`: un año pasado reiniciaría el contador y repetiría números del año en curso; uno futuro bloquearía el actual.
  - Devuelve códigos formateados `PREFIJO-NNN/AÑO`.

---

## 3. Formatos (`src/repositories/document`)
- `description` (simple-json) se reemplazó por `body` y `signature` (texto con variables). El registro de prueba que había se borró.
- `type` es enum (`TypeDocument`) y `department` es obligatorio.
- Formato de carga académica sin `{tabla}` en `body` → `400`. Departamento inexistente → `400`.
- `update` parte del documento guardado y aplica solo lo recibido (antes daba 500 sin `department`).
- **Un solo activo** por departamento y tipo: al guardar uno activo se desactivan los demás en la misma transacción.
- `GET /document?departmentId=&type=`: el jefe de departamento siempre ve solo el suyo.
- `GET /document/active?departmentId=&type=`: `404` si no hay; el frontend usa entonces el texto por defecto.

---

## 4. Eliminado

| Qué | Por qué | Notas |
|---|---|---|
| Módulo `inscription` completo (entidad, DTOs, servicio, controlador, enum de etapas) | La inscripción de estudiantes no funcionaba y se decidió quitarla | Tabla `inscription` borrada en la base local; **en producción hay que borrarla a mano** (`synchronize` no elimina tablas) |
| Columna `section.inscribed` | Solo la usaba la inscripción | `synchronize` la elimina al arrancar |
| Cascada de inscripciones al borrar una sección | Ya no hay inscripciones | — |
| `assertAdmin`, `assertCanManageDepartment`, `CurrentUserId` | Reemplazados por `RolesGuard` + `@AllowRoles`, `assertDepartmentScope` y `@CurrentUser` | Evita comprobaciones de rol duplicadas |
| Lectura del id de usuario desde la cookie (`user.controller`) | La cookie la controla el cliente | Usa `@CurrentUser()` |

---

## 5. Patrones a seguir

- **Ruta nueva:** si no es solo del Administrador (escritura) o es una lectura sensible, `@AllowRoles(...)`. Probar con un token de un rol no permitido (403).
- **Recurso de un departamento:** `assertDepartmentScope` en el servicio.
- **Borrado en cascada interno:** separar el método público (con permisos) de uno `removeById` sin permisos, como en `ScheduleService`.
- **Contadores o "un solo activo":** transacción, y bloqueo de fila si se lee y luego se escribe.
- **DTO de entrada:** `strictValidation` y límites (`@MaxLength`, `@Min`/`@Max`, `@Matches`, `@IsEnum`).

## 6. Pendiente conocido
- Un usuario eliminado recibe `403`; el frontend solo cierra sesión con `401`. Opción simple: responder `401` en ese caso.
- Alcance por departamento en secciones y profesores (hoy solo horarios, formatos y correlativo).
- `JWT_SECRET` en el servidor y borrar la tabla `inscription` en producción.
- `src/test` es código generado sin registrar (muerto).
