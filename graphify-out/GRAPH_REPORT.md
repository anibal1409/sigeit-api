# Graph Report - sigeit-api  (2026-09-29)

## Corpus Check
- 312 files · ~63,999 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .mdc 1, .jar 1)

## Summary
- 1911 nodes · 4730 edges · 80 communities (74 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 163 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5a978fde`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleService
- Classroom
- Teacher
- document.service.ts
- School
- day.service.ts
- CareerService
- PeriodService
- schedule-planning.service.ts
- package.json
- @nestjs/swagger
- Schedule
- user.service.ts
- inscription.service.ts
- subject-demand.service.ts
- login.service.ts
- Period
- section.service.ts
- Department
- @nestjs/typeorm
- dependencies
- TestService
- devDependencies
- recovery-password.service.ts
- Subject
- CreateUserDto
- audit.service.ts
- @nestjs/common
- auth.controller.ts
- Career
- audit-path.util.ts
- InscriptionController
- SubjectController
- scripts
- Public
- UserService
- InscriptionService
- schedule-conflict.service.ts
- Delete
- subject.service.ts
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- JwtAuthService
- audit-capture.service.ts
- subject-demand.parser.ts
- mail.service.ts
- .import
- FreeSlotsQueryDto
- login.guard.ts
- AuditAction
- DepartmentController
- SectionService
- CrudRepository
- .findByEntity
- department.service.ts
- AuditService
- DepartmentService
- Contrato de estadísticas para frontend con Chart.js
- Inscription
- jest
- ResponseDepartmentDto
- CreateTeacherDto
- README.md
- LoginUserResponseDto
- GetDepartmentsDto
- CreateDepartmentDto
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- main.ts
- @nestjs/testing
- AuditDiffService
- openapitools.json
- rxjs
- tsconfig.build.json
- QueryBaseDto
- engines
- test.entity.ts

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 89 edges
2. `@nestjs/common` - 77 edges
3. `class-validator` - 46 edges
4. `Department` - 42 edges
5. `class-transformer` - 41 edges
6. `Period` - 38 edges
7. `typeorm` - 37 edges
8. `Schedule` - 37 edges
9. `Section` - 37 edges
10. `@nestjs/typeorm` - 36 edges

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

## Communities (80 total, 6 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleService"
Cohesion: 0.05
Nodes (45): ApiConflictResponse, ApiOkResponse, ArrayNotEmpty, CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, IsArray (+37 more)

### Community 2 - "Classroom"
Cohesion: 0.06
Nodes (46): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+38 more)

### Community 3 - "Teacher"
Cohesion: 0.06
Nodes (37): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_updateteacherdto (+29 more)

### Community 4 - "document.service.ts"
Cohesion: 0.06
Nodes (37): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+29 more)

### Community 5 - "School"
Cohesion: 0.07
Nodes (34): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, ResponseSchoolDto (+26 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (29): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+21 more)

### Community 7 - "CareerService"
Cohesion: 0.06
Nodes (34): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+26 more)

### Community 8 - "PeriodService"
Cohesion: 0.08
Nodes (22): IsDate, ResponsePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+14 more)

### Community 9 - "schedule-planning.service.ts"
Cohesion: 0.08
Nodes (37): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_createscheduledto, src_repositories_schedule_dto_index_createschedulesbulkdto, src_repositories_schedule_dto_index_downloadplannedschedulesdto, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto, src_repositories_schedule_dto_index_getschedulesdto (+29 more)

### Community 10 - "package.json"
Cohesion: 0.05
Nodes (43): author, description, license, name, private, version, ejs, eslint (+35 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.12
Nodes (11): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity (+3 more)

### Community 12 - "Schedule"
Cohesion: 0.10
Nodes (20): Schedule, Column, Entity, JoinColumn, ManyToOne, ScheduleConflictService, Injectable, InjectRepository (+12 more)

### Community 13 - "user.service.ts"
Cohesion: 0.10
Nodes (24): ApiHideProperty, Exclude, src_auth_password_hasher_index_hashpassword, TeacherModule, Module, src_repositories_user_dto_index_userrespondedto, UpdateUserDto, src_repositories_user_entities_index_user (+16 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.11
Nodes (26): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+18 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.10
Nodes (25): GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto, ApiProperty, src_repositories_subject_demand_dto_index_getsubjectdemanddto, src_repositories_subject_demand_dto_index_importsubjectdemandresultdto (+17 more)

### Community 16 - "login.service.ts"
Cohesion: 0.08
Nodes (20): bcrypt, ref_express, ref_express_serve_static_core, passport-local, Inject, getDefaultCokieOptions(), src_auth_cookies_index_getdefaultcokieoptions, src_auth_jwt_auth_index_jwt_const (+12 more)

### Community 17 - "Period"
Cohesion: 0.12
Nodes (23): IsDateString, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsInt, IsNotEmpty, IsOptional (+15 more)

### Community 18 - "section.service.ts"
Cohesion: 0.09
Nodes (27): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+19 more)

### Community 19 - "Department"
Cohesion: 0.19
Nodes (15): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, Department, Column (+7 more)

### Community 20 - "@nestjs/typeorm"
Cohesion: 0.15
Nodes (20): @nestjs/typeorm, CareerModule, Module, Day, Column, Entity, src_repositories_day_entities_index_day, InscriptionModule (+12 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+23 more)

### Community 22 - "TestService"
Cohesion: 0.13
Nodes (13): CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param, Patch (+5 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "recovery-password.service.ts"
Cohesion: 0.13
Nodes (14): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, JWT_CONST, JwtResult, RecoveryPasswordDto, RecoveryPasswordResponseDto, ApiProperty (+6 more)

### Community 25 - "Subject"
Cohesion: 0.11
Nodes (18): ResponseSubjectDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+10 more)

### Community 26 - "CreateUserDto"
Cohesion: 0.11
Nodes (19): CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.15
Nodes (15): AuditModule, Module, AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto (+7 more)

### Community 28 - "@nestjs/common"
Cohesion: 0.14
Nodes (14): @nestjs/common, @nestjs/config, supertest, AppController, Controller, Get, AppModule, Module (+6 more)

### Community 29 - "auth.controller.ts"
Cohesion: 0.11
Nodes (19): src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice, src_auth_jwt_auth_index_jwtauthguard, src_auth_login_index_loginauthguard, src_auth_login_index_logindto, src_auth_login_index_loginservice, src_auth_login_index_loginuserresponsedto (+11 more)

### Community 30 - "Career"
Cohesion: 0.18
Nodes (12): src_common_use_case_index_crudrepository, src_repositories_career_dto_index_createcareerdto, src_repositories_career_dto_index_getcareersdto, src_repositories_career_dto_index_updatecareerdto, UpdateCareerDto, Career, Column, Entity (+4 more)

### Community 31 - "audit-path.util.ts"
Cohesion: 0.16
Nodes (15): AuditCaptureService, Injectable, AuditInterceptor, RequestUser, Injectable, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath() (+7 more)

### Community 32 - "InscriptionController"
Cohesion: 0.14
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 33 - "SubjectController"
Cohesion: 0.13
Nodes (15): GetSubjectDepartmentDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SubjectController, ApiResponse, ApiTags (+7 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.19
Nodes (13): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Param (+5 more)

### Community 36 - "UserService"
Cohesion: 0.16
Nodes (10): hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, UserRespondeDto (+2 more)

### Community 37 - "InscriptionService"
Cohesion: 0.18
Nodes (9): InscriptionService, Injectable, ResponseSectionDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 38 - "schedule-conflict.service.ts"
Cohesion: 0.22
Nodes (17): src_repositories_schedule_dto_index_dayconflictsdto, ScheduleCandidate, academicHours(), consecutiveBlocks(), findOverlaps(), isValidRange(), isWithinPeriod(), overlaps() (+9 more)

### Community 39 - "Delete"
Cohesion: 0.19
Nodes (11): Delete, SectionController, ApiResponse, ApiTags, Body, Controller, Get, Param (+3 more)

### Community 40 - "subject.service.ts"
Cohesion: 0.16
Nodes (13): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, src_repositories_subject_dto_index_createsubjectdto (+5 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.11
Nodes (18): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Error de Generación de Clientes, Error de Generación de Swagger, Estructura de Archivos Generados (+10 more)

### Community 43 - "JwtAuthService"
Cohesion: 0.13
Nodes (12): ChangePasswordService, Inject, Injectable, ChangePasswordDto, ChangePasswordResponseDto, ApiProperty, IsNotEmpty, IsString (+4 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.19
Nodes (12): AuditRequestShape, extractAuthAuditUser(), buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges(), sanitizeRequestBody() (+4 more)

### Community 45 - "subject-demand.parser.ts"
Cohesion: 0.19
Nodes (12): exceljs, ref_stream, detectDelimiter(), isInteger(), locateColumns(), normalizeHeader(), ParsedDemand, parseDemandFile() (+4 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): ApiBody, ApiConsumes, SubjectDemandController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "FreeSlotsQueryDto"
Cohesion: 0.21
Nodes (14): Matches, FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsInt (+6 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.16
Nodes (7): @nestjs/passport, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "DepartmentController"
Cohesion: 0.21
Nodes (9): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 52 - "SectionService"
Cohesion: 0.25
Nodes (3): SectionService, Injectable, InjectRepository

### Community 53 - "CrudRepository"
Cohesion: 0.19
Nodes (4): PaginationDataDto, PaginationDto, pagination(), CrudRepository

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "department.service.ts"
Cohesion: 0.29
Nodes (7): DepartmentModule, Module, src_repositories_department_dto_index_createdepartmentdto, src_repositories_department_dto_index_getdepartmentsdto, src_repositories_department_dto_index_responsedepartmentdto, src_repositories_department_dto_index_updatedepartmentdto, UpdateDepartmentDto

### Community 56 - "AuditService"
Cohesion: 0.24
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "DepartmentService"
Cohesion: 0.29
Nodes (3): DepartmentService, Injectable, InjectRepository

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "Inscription"
Cohesion: 0.20
Nodes (8): Inscription, Column, Entity, Index, JoinColumn, ManyToOne, Inject, InjectRepository

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "ResponseDepartmentDto"
Cohesion: 0.22
Nodes (8): ResponseDepartmentDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 62 - "CreateTeacherDto"
Cohesion: 0.22
Nodes (9): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "LoginUserResponseDto"
Cohesion: 0.32
Nodes (8): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type

### Community 65 - "GetDepartmentsDto"
Cohesion: 0.29
Nodes (6): Query, GetDepartmentsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

### Community 66 - "CreateDepartmentDto"
Cohesion: 0.25
Nodes (8): CreateDepartmentDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): Max, GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.33
Nodes (6): download(), execute(), fs, https, ref_child_process, ref_https

### Community 70 - "main.ts"
Cohesion: 0.29
Nodes (3): cookie-parser, ref_fs, @nestjs/core

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

## Knowledge Gaps
- **227 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+222 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 784 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `Teacher`, `document.service.ts`, `School`, `day.service.ts`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `login.service.ts`, `Period`, `section.service.ts`, `@nestjs/typeorm`, `TestService`, `recovery-password.service.ts`, `audit.service.ts`, `auth.controller.ts`, `Career`, `audit-path.util.ts`, `schedule-conflict.service.ts`, `subject.service.ts`, `JwtAuthService`, `audit-capture.service.ts`, `subject-demand.parser.ts`, `mail.service.ts`, `login.guard.ts`, `department.service.ts`, `main.ts`, `AuditDiffService`?**
  _High betweenness centrality (0.294) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `Classroom`, `Teacher`, `document.service.ts`, `School`, `day.service.ts`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `Period`, `section.service.ts`, `Department`, `@nestjs/typeorm`, `TestService`, `recovery-password.service.ts`, `audit.service.ts`, `auth.controller.ts`, `Career`, `subject.service.ts`, `FreeSlotsQueryDto`, `department.service.ts`, `main.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/typeorm` to `statistics.service.ts`, `Classroom`, `Teacher`, `document.service.ts`, `School`, `day.service.ts`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `Period`, `section.service.ts`, `audit.service.ts`, `@nestjs/common`, `Career`, `schedule-conflict.service.ts`, `subject.service.ts`, `department.service.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _227 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleService` be split into smaller, more focused modules?**
  _Cohesion score 0.05126452494873548 - nodes in this community are weakly interconnected._
- **Should `Classroom` be split into smaller, more focused modules?**
  _Cohesion score 0.05516431924882629 - nodes in this community are weakly interconnected._