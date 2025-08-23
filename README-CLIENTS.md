# Generación de Clientes API - SIGEIT-API

Este documento describe cómo generar clientes de API para diferentes plataformas usando la especificación OpenAPI de SIGEIT-API.

## Scripts Disponibles

### Generación de Swagger
```bash
npm run generate:swagger
```
Genera el archivo `swagger.json` a partir de los controladores y DTOs de la aplicación.

### Generación de Clientes
```bash
npm run generate:clients
```
Genera clientes de API usando OpenAPI Generator CLI. Los clientes se generan en el directorio `./generated/api-client/`.

### Generación Completa de Clientes
```bash
npm run build:client
```
Ejecuta tanto la generación de Swagger como la generación de clientes en secuencia.

```bash
npm run build:client:full
```
Ejecuta la generación completa y además copia los clientes al proyecto `dashboard-sdk` (equivalente a `npm run build:client && npm run postbuild:client`).

### Copia de Clientes (Post-construcción)
```bash
npm run postbuild:client
```
Limpia el directorio existente y copia los clientes generados al directorio `../sigeit/projects/dashboard-sdk/` (para Linux/Mac).

```bash
npm run postbuild:client-windows
```
Limpia el directorio existente y copia los clientes generados al directorio `../sigeit/projects/dashboard-sdk/` (para Windows).

**Nota**: Los scripts limpian automáticamente el directorio `api-client` existente antes de copiar los nuevos archivos para evitar archivos obsoletos.

## Configuración

### Archivo de Configuración OpenAPI
El archivo `./openapi/config.json` contiene la configuración para la generación de clientes:

- `providedInRoot`: true - Los servicios se proporcionan en el root del módulo
- `serviceSuffix`: "ApiService" - Sufijo para los servicios generados
- `modelPropertyNaming`: "camelCase" - Nomenclatura camelCase para propiedades
- `useRxJS`: true - Usa RxJS para observables
- `generatePublicApi`: true - Genera archivo public-api.ts
- `ngVersion`: "20.0.0" - Versión de Angular para compatibilidad

### Dependencias Requeridas
- `@openapitools/openapi-generator-cli`: Herramienta para generar clientes
- `ts-node`: Para ejecutar scripts TypeScript
- `tsconfig-paths`: Para resolución de paths de TypeScript

## Estructura de Archivos Generados

```
generated/
└── api-client/
    ├── api/           # Servicios de API
    ├── model/         # Modelos de datos
    ├── api.module.ts  # Módulo Angular
    ├── configuration.ts # Configuración del cliente
    └── index.ts       # Exportaciones principales
```

## Uso en Proyectos Frontend

### Angular
1. Copia el directorio `generated/api-client` a tu proyecto Angular
2. Importa `ApiModule` en tu `app.module.ts`
3. Usa los servicios generados en tus componentes

### Otros Frameworks
Los clientes generados son compatibles con cualquier framework que soporte TypeScript. Solo necesitas importar las clases y tipos generados.

## Flujo de Trabajo Recomendado

1. **Desarrollo**: Usa `npm run generate:swagger` para probar cambios en la API
2. **Generación**: Usa `npm run build:client` para generar clientes actualizados
3. **Distribución**: Usa `npm run build:client:full` para generar y copiar automáticamente a `../sigeit/projects/dashboard-sdk/`
4. **Integración**: El proyecto `dashboard-sdk` puede usar los clientes generados

**Alternativas**:
- Solo generar: `npm run build:client`
- Solo copiar: `npm run postbuild:client`
- Todo en uno: `npm run build:client:full`

## Solución de Problemas

### Error de Generación de Swagger
- Verifica que todos los controladores tengan decoradores `@ApiTags`
- Asegúrate de que los DTOs tengan decoradores de validación
- Revisa que el `AppModule` se pueda instanciar correctamente

### Error de Generación de Clientes
- Verifica que el archivo `swagger.json` existe y es válido
- Asegúrate de que `@openapitools/openapi-generator-cli` esté instalado
- Revisa la configuración en `./openapi/config.json`

### Problemas de Compatibilidad
- Los clientes generados son compatibles con Angular 20+
- Para versiones anteriores, ajusta `ngVersion` en la configuración
- Verifica que las dependencias de RxJS sean compatibles 