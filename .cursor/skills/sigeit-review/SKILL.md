---
name: sigeit-review
description: Revisión completa de cambios en sigeit-api antes de darlos por terminados o hacer commit — seguridad, eficiencia, código duplicado o muerto, documentación en español e identificadores en inglés. Usar al terminar cualquier desarrollo, al pedir "revisión", "review", "auditoría" o antes de commitear.
---

# Revisión de cambios — sigeit-api

Aplica las reglas de `.cursor/rules/api.mdc` sobre el diff (`git diff` y archivos nuevos). Leer cada archivo tocado completo, no solo el diff, y seguir el flujo real (controlador → servicio → entidad).

## 1. Seguridad
- [ ] Ningún secreto en el código; las variables nuevas están en `.env.example`.
- [ ] Todo endpoint de escritura comprueba permisos con `user/permissions.ts`; los de lectura públicos llevan `@Public()` a propósito.
- [ ] El usuario sale de `@CurrentUserId()`, no de cookie, cuerpo ni query.
- [ ] `@Body(strictValidation)` / `@Query(strictValidation)`: enviar `{"id":1}` o `{"deleted":true}` debe dar 400.
- [ ] Al hacer `{ ...guardado, ...dto }`, el DTO no puede traer campos que cambien de dueño o de departamento sin volver a comprobar permisos.
- [ ] Números con `@Min`/`@Max`, textos con `@MaxLength`, formatos con `@Matches`/`@IsEnum`.
- [ ] Un usuario eliminado o inactivo no conserva permisos.
- [ ] Contadores y "un solo activo" dentro de transacción; lectura-modificación-escritura con `lock: { mode: 'pessimistic_write' }`.
- [ ] Sin SQL concatenado con datos del usuario; usar parámetros de TypeORM.
- [ ] Los errores esperados responden 400/403/404, nunca 500 (probar casos límite: campo ausente, id inexistente, valores en el borde).

## 2. Eficiencia
- [ ] Sin consultas dentro de bucles (N+1); usar `In(...)` o un solo `find`.
- [ ] No volver a consultar lo que ya se tiene (p. ej. devolver el resultado de `save` en lugar de `findOne` otra vez).
- [ ] `relations` solo si la respuesta las usa.

## 3. Duplicado y muerto
- [ ] Buscar (`graphify query`, `grep`) si la lógica ya existe antes de aceptarla como nueva.
- [ ] Sin imports, variables, parámetros, métodos o archivos sin usar (`npx eslint` y revisar a mano).
- [ ] Ningún método supera 50 líneas efectivas.

## 4. Idioma y documentación
- [ ] Identificadores, archivos, carpetas, rutas y mensajes de excepción en inglés.
- [ ] JSDoc en español en clases, métodos públicos, DTOs y entidades; comentario del porqué en la lógica no trivial.
- [ ] Swagger completo: `@ApiTags`, `@ApiOperation`, `@ApiResponse` y respuestas de error.

## 5. Verificación
1. `npx eslint --fix <archivos>` y `npx nest build`.
2. Arrancar la API y probar con curl los casos felices y los de ataque (permisos, asignación masiva, límites).
3. Borrar los datos de prueba creados.
4. `npm run build:client:full` si cambió la API pública, y `graphify update .`.

Informar los hallazgos por severidad (crítico, alto, medio, bajo) con archivo:línea, lo corregido y lo pendiente.
