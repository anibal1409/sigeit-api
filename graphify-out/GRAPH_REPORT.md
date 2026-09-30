# Graph Report - sigeit-api  (2026-09-30)

## Corpus Check
- 333 files · ~70,462 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .mdc 1, .jar 1)

## Summary
- 2096 nodes · 5245 edges · 93 communities (83 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 175 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aef4085f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleService
- classroom.service.ts
- TeacherController
- document.service.ts
- @nestjs/testing
- day.service.ts
- CareerController
- period.service.ts
- schedule-time.util.ts
- package.json
- @nestjs/swagger
- schedule-planning.service.ts
- user.service.ts
- inscription.service.ts
- subject-demand.service.ts
- subject-demand.parser.ts
- period.controller.ts
- section.service.ts
- typeorm
- @nestjs/common
- dependencies
- Delete
- devDependencies
- recovery-password.service.ts
- Teacher
- Schedule
- audit.service.ts
- app.module.ts
- auth.controller.ts
- career.service.ts
- audit.module.ts
- InscriptionController
- Subject
- scripts
- Public
- UserService
- InscriptionService
- TeacherDegree
- CareerService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- teacher-degree.service.ts
- audit-capture.service.ts
- Department
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- JwtAuthGuard
- AuditAction
- DepartmentService
- ResponseCareerDto
- CrudRepository
- .findByEntity
- schedule.module.ts
- AuditService
- TeacherDegreeService
- Contrato de estadísticas para frontend con Chart.js
- Inscription
- jest
- CreateTeacherDegreeDto
- CreateTeacherDto
- README.md
- LoginUserResponseDto
- AppModule
- teacher.service.ts
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- login.guard.ts
- transcript-ai.reader.ts
- Section
- openapitools.json
- GetCareersDto
- tsconfig.build.json
- CreateCareerDto
- TeacherService
- test.entity.ts
- ResponseTeacherDto
- GetTeachersDto
- property-diff.util.ts
- CoverageStatus
- CloseInscriptionDto
- CreateInscriptionDto
- GetInscriptionDto
- rxjs
- engines
- DayModule
- DepartmentModule
- StatisticsModule
- UserModule

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 97 edges
2. `@nestjs/common` - 81 edges
3. `class-validator` - 48 edges
4. `class-transformer` - 43 edges
5. `Section` - 43 edges
6. `Department` - 42 edges
7. `typeorm` - 40 edges
8. `@nestjs/typeorm` - 39 edges
9. `Period` - 39 edges
10. `IdEntity` - 37 edges

## Surprising Connections (you probably didn't know these)
- `Error de Generación de Swagger` --references--> `AppModule`  [INFERRED]
  README-CLIENTS.md → src/app.module.ts
- `CreateAuditEntryParams` --references--> `AuditAction`  [EXTRACTED]
  src/audit/audit.service.ts → src/audit/enum/audit-action.enum.ts
- `ResponseAuditLogDto` --references--> `AuditAction`  [EXTRACTED]
  src/audit/dto/response-audit-log.dto.ts → src/audit/enum/audit-action.enum.ts
- `AuditLog` --references--> `AuditAction`  [EXTRACTED]
  src/audit/entities/audit-log.entity.ts → src/audit/enum/audit-action.enum.ts
- `LoginUserResponseDto` --references--> `Career`  [EXTRACTED]
  src/auth/login/dto/login.dto.ts → src/repositories/career/entities/career.entity.ts

## Import Cycles
- 4-file cycle: `src/auth/jwt-auth/JwtAuth.guard.ts -> src/auth/login/index.ts -> src/auth/login/login.service.ts -> src/auth/jwt-auth/index.ts -> src/auth/jwt-auth/JwtAuth.guard.ts`
- 4-file cycle: `src/repositories/career/entities/career.entity.ts -> src/repositories/subject/entities/index.ts -> src/repositories/subject/entities/subject.entity.ts -> src/repositories/career/entities/index.ts -> src/repositories/career/entities/career.entity.ts`
- 4-file cycle: `src/repositories/classroom/entities/classroom.entity.ts -> src/repositories/department/entities/index.ts -> src/repositories/department/entities/department.entity.ts -> src/repositories/classroom/entities/index.ts -> src/repositories/classroom/entities/classroom.entity.ts`

## Communities (93 total, 10 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleService"
Cohesion: 0.06
Nodes (40): ApiConflictResponse, ApiOkResponse, InjectRepository, CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty (+32 more)

### Community 2 - "classroom.service.ts"
Cohesion: 0.06
Nodes (38): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+30 more)

### Community 3 - "TeacherController"
Cohesion: 0.18
Nodes (10): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+2 more)

### Community 4 - "document.service.ts"
Cohesion: 0.06
Nodes (40): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+32 more)

### Community 5 - "@nestjs/testing"
Cohesion: 0.06
Nodes (35): @nestjs/testing, CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+27 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (30): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+22 more)

### Community 7 - "CareerController"
Cohesion: 0.21
Nodes (9): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 8 - "period.service.ts"
Cohesion: 0.05
Nodes (41): IsDate, src_common_use_case_index_crudrepository, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt (+33 more)

### Community 9 - "schedule-time.util.ts"
Cohesion: 0.22
Nodes (16): academicHours(), consecutiveBlocks(), findOverlaps(), isValidRange(), isWithinPeriod(), overlaps(), peakLevel(), periodLimit() (+8 more)

### Community 10 - "package.json"
Cohesion: 0.05
Nodes (42): author, description, license, name, private, version, ejs, eslint (+34 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.12
Nodes (11): class-transformer, class-validator, @nestjs/swagger, QueryBaseDto, ApiPropertyOptional, Type, IdCreateEntity, ApiProperty (+3 more)

### Community 12 - "schedule-planning.service.ts"
Cohesion: 0.10
Nodes (34): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_createscheduledto, src_repositories_schedule_dto_index_createschedulesbulkdto, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_downloadplannedschedulesdto, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto (+26 more)

### Community 13 - "user.service.ts"
Cohesion: 0.12
Nodes (22): src_auth_password_hasher_index_hashpassword, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional (+14 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.21
Nodes (11): src_repositories_inscription_dto_index_closeinscriptiondto, src_repositories_inscription_dto_index_createinscriptiondto, src_repositories_inscription_dto_index_getinscriptiondto, src_repositories_inscription_dto_index_responseinscriptiondto, src_repositories_inscription_dto_index_updateinscriptiondto, UpdateInscriptionDto, src_repositories_inscription_entities_index_inscription, src_repositories_inscription_enums_index_stageinscription (+3 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.09
Nodes (25): FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto (+17 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.17
Nodes (13): exceljs, ref_stream, src_common_text_index_stripaccents, stripAccents(), detectDelimiter(), isInteger(), locateColumns(), normalizeHeader() (+5 more)

### Community 18 - "section.service.ts"
Cohesion: 0.05
Nodes (46): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+38 more)

### Community 19 - "typeorm"
Cohesion: 0.25
Nodes (8): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, src_repositories_teacher_entities_index_teacher, UpdateDateColumn

### Community 20 - "@nestjs/common"
Cohesion: 0.17
Nodes (18): @nestjs/common, @nestjs/typeorm, ClassroomModule, Module, InscriptionModule, Module, PeriodModule, Module (+10 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.12
Nodes (14): Delete, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "recovery-password.service.ts"
Cohesion: 0.13
Nodes (12): ref_jsonwebtoken, @nestjs/jwt, Inject, ChangePasswordService, Inject, Injectable, src_auth_change_password_dto_index_changepasswordresponsedto, JWT_CONST (+4 more)

### Community 25 - "Teacher"
Cohesion: 0.10
Nodes (29): Teacher, Column, Entity, JoinColumn, ManyToOne, src_repositories_teacher_enum_index_employmentstatus, src_repositories_teacher_enum_index_hiringevaluationstatus, src_repositories_teacher_enum_index_teacher_category_level (+21 more)

### Community 26 - "Schedule"
Cohesion: 0.10
Nodes (19): Classroom, Column, Entity, JoinTable, ManyToMany, ResponseScheduleDto, ApiProperty, IsBoolean (+11 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.20
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "app.module.ts"
Cohesion: 0.15
Nodes (12): @nestjs/config, AppController, Controller, Get, AppService, Injectable, AuditModule, Module (+4 more)

### Community 29 - "auth.controller.ts"
Cohesion: 0.05
Nodes (41): bcrypt, ref_express, ref_express_serve_static_core, @nestjs/passport, passport-jwt, passport-local, src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto (+33 more)

### Community 30 - "career.service.ts"
Cohesion: 0.28
Nodes (6): CareerModule, Module, src_repositories_career_dto_index_createcareerdto, src_repositories_career_dto_index_getcareersdto, src_repositories_career_dto_index_updatecareerdto, UpdateCareerDto

### Community 31 - "audit.module.ts"
Cohesion: 0.18
Nodes (7): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable

### Community 32 - "InscriptionController"
Cohesion: 0.18
Nodes (10): InscriptionController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+2 more)

### Community 33 - "Subject"
Cohesion: 0.05
Nodes (46): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+38 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.10
Nodes (25): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Param (+17 more)

### Community 36 - "UserService"
Cohesion: 0.08
Nodes (28): ApiHideProperty, Exclude, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+20 more)

### Community 37 - "InscriptionService"
Cohesion: 0.18
Nodes (8): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, InjectRepository

### Community 38 - "TeacherDegree"
Cohesion: 0.10
Nodes (23): OneToMany, ResponseTeacherGradeDto, ApiProperty, src_repositories_teacher_entities_index_teacherdegree, src_repositories_teacher_entities_index_teachergrade, TeacherDegree, Column, Entity (+15 more)

### Community 39 - "CareerService"
Cohesion: 0.29
Nodes (3): CareerService, Injectable, InjectRepository

### Community 40 - "TeacherDegreeController"
Cohesion: 0.16
Nodes (15): TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body, Controller (+7 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.13
Nodes (14): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Estructura de Archivos Generados, Flujo de Trabajo Recomendado, Generación Completa de Clientes (+6 more)

### Community 43 - "teacher-degree.service.ts"
Cohesion: 0.10
Nodes (29): @nestjs/platform-express, src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdto, src_repositories_teacher_dto_index_responseteachergradesearchdto (+21 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "Department"
Cohesion: 0.13
Nodes (19): Career, Column, Entity, JoinColumn, ManyToMany, ManyToOne, src_repositories_career_entities_index_career, src_repositories_department_dto_index_createdepartmentdto (+11 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.24
Nodes (14): Matches, FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean (+6 more)

### Community 50 - "AuditAction"
Cohesion: 0.12
Nodes (14): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+6 more)

### Community 51 - "DepartmentService"
Cohesion: 0.06
Nodes (34): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+26 more)

### Community 52 - "ResponseCareerDto"
Cohesion: 0.22
Nodes (8): ResponseCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 53 - "CrudRepository"
Cohesion: 0.19
Nodes (4): PaginationDataDto, PaginationDto, pagination(), CrudRepository

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "schedule.module.ts"
Cohesion: 0.29
Nodes (5): src_repositories_classroom_entities_index_classroom, src_repositories_day_entities_index_day, src_repositories_period_entities_index_period, src_repositories_schedule_entities_index_schedule, src_repositories_section_entities_index_section

### Community 56 - "AuditService"
Cohesion: 0.21
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "TeacherDegreeService"
Cohesion: 0.33
Nodes (6): ResponseTeacherDegreeDto, ApiPropertyOptional, assertGradesInScale(), TeacherDegreeService, toGradeEntity(), Injectable

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "Inscription"
Cohesion: 0.22
Nodes (8): Inscription, Column, Entity, Index, JoinColumn, ManyToOne, Inject, InjectRepository

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.18
Nodes (15): IsPositive, CreateTeacherDegreeDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray, IsDateString, IsEnum (+7 more)

### Community 62 - "CreateTeacherDto"
Cohesion: 0.18
Nodes (11): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+3 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "LoginUserResponseDto"
Cohesion: 0.32
Nodes (8): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type

### Community 65 - "AppModule"
Cohesion: 0.25
Nodes (7): Error de Generación de Clientes, Error de Generación de Swagger, Problemas de Compatibilidad, Solución de Problemas, supertest, AppModule, Module

### Community 66 - "teacher.service.ts"
Cohesion: 0.27
Nodes (7): src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_responsesubjecthistorydto, src_repositories_teacher_dto_index_updateteacherdto, ResponseSubjectHistoryDto, ApiProperty, UpdateTeacherDto

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.22
Nodes (7): download(), execute(), fs, https, ref_child_process, ref_fs, ref_https

### Community 70 - "login.guard.ts"
Cohesion: 0.20
Nodes (6): cookie-parser, @nestjs/core, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.16
Nodes (17): pdf-parse, src_repositories_teacher_dto_index_teachergradedto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, buildRequest(), callModel(), failure() (+9 more)

### Community 72 - "Section"
Cohesion: 0.13
Nodes (15): Period, Column, Entity, ScheduleConflictService, Injectable, InjectRepository, SchedulePlanningService, Injectable (+7 more)

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "GetCareersDto"
Cohesion: 0.29
Nodes (6): Query, GetCareersDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "CreateCareerDto"
Cohesion: 0.25
Nodes (8): CreateCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 77 - "TeacherService"
Cohesion: 0.31
Nodes (3): TeacherService, Injectable, InjectRepository

### Community 80 - "ResponseTeacherDto"
Cohesion: 0.20
Nodes (9): ResponseTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 81 - "GetTeachersDto"
Cohesion: 0.25
Nodes (7): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, Query

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 83 - "CoverageStatus"
Cohesion: 0.40
Nodes (5): CoverageStatus, Complete, Empty, Exceeded, Incomplete

### Community 84 - "CloseInscriptionDto"
Cohesion: 0.40
Nodes (5): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type

### Community 85 - "CreateInscriptionDto"
Cohesion: 0.40
Nodes (5): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type

### Community 86 - "GetInscriptionDto"
Cohesion: 0.40
Nodes (5): GetInscriptionDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

## Knowledge Gaps
- **250 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+245 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 850 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `classroom.service.ts`, `document.service.ts`, `@nestjs/testing`, `day.service.ts`, `period.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `subject-demand.parser.ts`, `period.controller.ts`, `section.service.ts`, `Delete`, `recovery-password.service.ts`, `audit.service.ts`, `app.module.ts`, `auth.controller.ts`, `career.service.ts`, `audit.module.ts`, `Subject`, `teacher-degree.service.ts`, `audit-capture.service.ts`, `Department`, `mail.service.ts`, `schedule.module.ts`, `AppModule`, `teacher.service.ts`, `login.guard.ts`, `transcript-ai.reader.ts`?**
  _High betweenness centrality (0.288) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `classroom.service.ts`, `document.service.ts`, `@nestjs/testing`, `day.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `period.controller.ts`, `section.service.ts`, `typeorm`, `Delete`, `Teacher`, `audit.service.ts`, `auth.controller.ts`, `career.service.ts`, `Subject`, `Public`, `TeacherDegree`, `teacher-degree.service.ts`, `Department`, `DepartmentService`, `schedule.module.ts`, `teacher.service.ts`, `openapi.js`, `login.guard.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/common` to `statistics.service.ts`, `classroom.service.ts`, `document.service.ts`, `@nestjs/testing`, `day.service.ts`, `period.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `audit.service.ts`, `app.module.ts`, `career.service.ts`, `audit.module.ts`, `Subject`, `TeacherDegree`, `teacher-degree.service.ts`, `Department`, `schedule.module.ts`, `teacher.service.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _250 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleService` be split into smaller, more focused modules?**
  _Cohesion score 0.05921325051759834 - nodes in this community are weakly interconnected._
- **Should `classroom.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.059322033898305086 - nodes in this community are weakly interconnected._