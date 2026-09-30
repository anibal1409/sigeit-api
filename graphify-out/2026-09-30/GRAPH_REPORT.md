# Graph Report - sigeit-api  (2026-09-30)

## Corpus Check
- 328 files · ~68,675 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .mdc 1, .jar 1)

## Summary
- 2077 nodes · 5167 edges · 84 communities (82 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 173 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aef4085f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- Classroom
- TeacherController
- document.service.ts
- school.service.ts
- DayService
- CareerService
- Period
- schedule.controller.ts
- package.json
- @nestjs/swagger
- schedule-planning.service.ts
- user.service.ts
- inscription.service.ts
- subject-demand.service.ts
- login.service.ts
- period.service.ts
- section.service.ts
- typeorm
- @nestjs/common
- dependencies
- @nestjs/testing
- devDependencies
- recovery-password.service.ts
- Teacher
- ScheduleService
- audit.service.ts
- app.module.ts
- auth.controller.ts
- Career
- audit-path.util.ts
- InscriptionController
- SubjectService
- scripts
- Public
- UserService
- InscriptionService
- TeacherDegree
- SectionController
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- teacher-degree.service.ts
- audit-capture.service.ts
- Department
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- JwtAuth.guard.ts
- AuditAction
- CrudRepository
- SectionService
- pagination.ts
- .findByEntity
- day.service.ts
- AuditService
- TeacherDegreeService
- Contrato de estadísticas para frontend con Chart.js
- Inscription
- jest
- CreateTeacherDegreeDto
- CreateTeacherDto
- README.md
- LoginUserResponseDto
- CreateScheduleDto
- teacher.service.ts
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- main.ts
- transcript.parser.ts
- Section
- openapitools.json
- SearchTeacherGradeDto
- tsconfig.build.json
- QueryBaseDto
- TeacherService
- test.entity.ts
- ResponseTeacherDto
- GetTeachersDto
- GetSchedulesDto
- CoverageStatus

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 96 edges
2. `@nestjs/common` - 80 edges
3. `class-validator` - 48 edges
4. `class-transformer` - 43 edges
5. `Department` - 42 edges
6. `Section` - 42 edges
7. `typeorm` - 40 edges
8. `Period` - 39 edges
9. `@nestjs/typeorm` - 37 edges
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

## Communities (84 total, 2 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.19
Nodes (14): ApiConflictResponse, ApiOkResponse, ScheduleController, ApiOperation, ApiResponse, ApiTags, Body, Controller (+6 more)

### Community 2 - "Classroom"
Cohesion: 0.05
Nodes (46): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+38 more)

### Community 3 - "TeacherController"
Cohesion: 0.19
Nodes (10): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+2 more)

### Community 4 - "document.service.ts"
Cohesion: 0.07
Nodes (37): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+29 more)

### Community 5 - "school.service.ts"
Cohesion: 0.07
Nodes (30): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, ResponseSchoolDto (+22 more)

### Community 6 - "DayService"
Cohesion: 0.08
Nodes (23): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+15 more)

### Community 7 - "CareerService"
Cohesion: 0.06
Nodes (34): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+26 more)

### Community 8 - "Period"
Cohesion: 0.08
Nodes (26): IsDate, Delete, ResponsePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional (+18 more)

### Community 9 - "schedule.controller.ts"
Cohesion: 0.12
Nodes (19): DownloadPlannedSchedulesDto, ApiProperty, IsNumber, IsOptional, src_repositories_schedule_dto_index_createscheduledto, src_repositories_schedule_dto_index_createschedulesbulkdto, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_downloadplannedschedulesdto (+11 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (44): author, description, engines, node, license, name, private, version (+36 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.16
Nodes (9): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity (+1 more)

### Community 12 - "schedule-planning.service.ts"
Cohesion: 0.09
Nodes (46): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_scheduleconflictsdto, src_repositories_schedule_dto_index_schedulelitedto, AuditSummaryDto, ConflictPairDto, DayConflictsDto, FreeClassroomDto (+38 more)

### Community 13 - "user.service.ts"
Cohesion: 0.10
Nodes (25): src_auth_password_hasher_index_hashpassword, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional (+17 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.13
Nodes (21): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+13 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.07
Nodes (36): exceljs, ref_stream, src_common_text_index_stripaccents, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto (+28 more)

### Community 16 - "login.service.ts"
Cohesion: 0.12
Nodes (11): bcrypt, ref_express, ref_express_serve_static_core, getDefaultCokieOptions(), src_auth_cookies_index_getdefaultcokieoptions, src_auth_jwt_auth_index_jwt_const, src_auth_login_dto_index_loginuserresponsedto, src_auth_login_dto_index_userlogindto (+3 more)

### Community 17 - "period.service.ts"
Cohesion: 0.12
Nodes (21): CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional (+13 more)

### Community 18 - "section.service.ts"
Cohesion: 0.11
Nodes (22): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+14 more)

### Community 19 - "typeorm"
Cohesion: 0.17
Nodes (15): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, src_repositories_subject_entities_index_subject, Subject (+7 more)

### Community 20 - "@nestjs/common"
Cohesion: 0.09
Nodes (32): @nestjs/common, @nestjs/typeorm, src_common_use_case_index_crudrepository, CareerModule, Module, src_repositories_career_dto_index_createcareerdto, src_repositories_career_dto_index_getcareersdto, src_repositories_career_dto_index_updatecareerdto (+24 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "@nestjs/testing"
Cohesion: 0.09
Nodes (15): @nestjs/testing, src_repositories_document_document_service_periodservice, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get (+7 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "recovery-password.service.ts"
Cohesion: 0.11
Nodes (13): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, Inject, src_auth_change_password_dto_index_changepasswordresponsedto, JWT_CONST, src_auth_jwt_auth_index_jwtauthservice, JwtAuthService (+5 more)

### Community 25 - "Teacher"
Cohesion: 0.11
Nodes (29): Teacher, Column, Entity, JoinColumn, ManyToOne, src_repositories_teacher_enum_index_employmentstatus, src_repositories_teacher_enum_index_hiringevaluationstatus, src_repositories_teacher_enum_index_teacher_category_level (+21 more)

### Community 26 - "ScheduleService"
Cohesion: 0.14
Nodes (11): ResponseScheduleDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, ScheduleService (+3 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.17
Nodes (13): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+5 more)

### Community 28 - "app.module.ts"
Cohesion: 0.15
Nodes (12): @nestjs/config, AppController, Controller, Get, AppService, Injectable, AuditModule, Module (+4 more)

### Community 29 - "auth.controller.ts"
Cohesion: 0.07
Nodes (33): @nestjs/passport, passport-local, AuthController, ApiTags, Controller, Inject, ChangePasswordService, Injectable (+25 more)

### Community 30 - "Career"
Cohesion: 0.23
Nodes (8): UpdateCareerDto, Career, Column, Entity, JoinColumn, ManyToMany, ManyToOne, src_repositories_career_entities_index_career

### Community 31 - "audit-path.util.ts"
Cohesion: 0.13
Nodes (15): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, EXCLUDED_PREFIXES (+7 more)

### Community 32 - "InscriptionController"
Cohesion: 0.14
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 33 - "SubjectService"
Cohesion: 0.06
Nodes (33): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+25 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.10
Nodes (22): Put, ApiResponse, Body, Get, Param, Post, Req, Res (+14 more)

### Community 36 - "UserService"
Cohesion: 0.07
Nodes (28): ApiHideProperty, Exclude, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+20 more)

### Community 37 - "InscriptionService"
Cohesion: 0.12
Nodes (14): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, ResponseSectionDto (+6 more)

### Community 38 - "TeacherDegree"
Cohesion: 0.10
Nodes (19): OneToMany, TeacherDegree, Column, Entity, JoinColumn, ManyToOne, TeacherGrade, Column (+11 more)

### Community 39 - "SectionController"
Cohesion: 0.15
Nodes (15): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiResponse, ApiTags (+7 more)

### Community 40 - "TeacherDegreeController"
Cohesion: 0.15
Nodes (15): TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body, Controller (+7 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.11
Nodes (18): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Error de Generación de Clientes, Error de Generación de Swagger, Estructura de Archivos Generados (+10 more)

### Community 43 - "teacher-degree.service.ts"
Cohesion: 0.15
Nodes (17): @nestjs/platform-express, stripAccents(), src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdto, src_repositories_teacher_dto_index_responseteachergradesearchdto, src_repositories_teacher_dto_index_searchteachergradedto, src_repositories_teacher_dto_index_teachergradematchdto (+9 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (14): AuditRequestShape, maskSensitivePath(), parseResourceFromPath(), extractAuthAuditUser(), buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit() (+6 more)

### Community 45 - "Department"
Cohesion: 0.22
Nodes (12): Department, Column, Entity, JoinColumn, ManyToMany, ManyToOne, src_repositories_department_entities_index_department, src_repositories_school_entities_index_school (+4 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.20
Nodes (15): Matches, FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean (+7 more)

### Community 49 - "JwtAuth.guard.ts"
Cohesion: 0.17
Nodes (6): rxjs, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, UseCase

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "CrudRepository"
Cohesion: 0.06
Nodes (40): CrudRepository, DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param (+32 more)

### Community 52 - "SectionService"
Cohesion: 0.25
Nodes (3): SectionService, Injectable, InjectRepository

### Community 53 - "pagination.ts"
Cohesion: 0.31
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "day.service.ts"
Cohesion: 0.20
Nodes (10): DayModule, Module, src_repositories_day_dto_index_createdaydto, src_repositories_day_dto_index_responsedaydto, src_repositories_day_dto_index_updatedaydto, UpdateDayDto, Day, Column (+2 more)

### Community 56 - "AuditService"
Cohesion: 0.24
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "TeacherDegreeService"
Cohesion: 0.23
Nodes (8): ResponseTeacherDegreeDto, ResponseTeacherGradeDto, ApiProperty, ApiPropertyOptional, assertGradesInScale(), TeacherDegreeService, toGradeEntity(), Injectable

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

### Community 65 - "CreateScheduleDto"
Cohesion: 0.14
Nodes (12): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+4 more)

### Community 66 - "teacher.service.ts"
Cohesion: 0.23
Nodes (7): src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_responsesubjecthistorydto, src_repositories_teacher_dto_index_updateteacherdto, ResponseSubjectHistoryDto, ApiProperty, UpdateTeacherDto

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.33
Nodes (6): download(), execute(), fs, https, ref_child_process, ref_https

### Community 70 - "main.ts"
Cohesion: 0.20
Nodes (6): cookie-parser, ref_fs, @nestjs/core, supertest, AppModule, Module

### Community 71 - "transcript.parser.ts"
Cohesion: 0.24
Nodes (9): pdf-parse, src_repositories_teacher_dto_index_teachergradedto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, parseTranscriptPdf(), parseTranscriptText(), toGrade() (+1 more)

### Community 72 - "Section"
Cohesion: 0.18
Nodes (8): InjectRepository, InjectRepository, Section, Column, Entity, JoinColumn, ManyToOne, InjectRepository

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "SearchTeacherGradeDto"
Cohesion: 0.20
Nodes (11): SearchTeacherGradeDto, TeacherGradeMatchDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString (+3 more)

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

### Community 77 - "TeacherService"
Cohesion: 0.31
Nodes (3): TeacherService, Injectable, InjectRepository

### Community 80 - "ResponseTeacherDto"
Cohesion: 0.20
Nodes (9): ResponseTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 81 - "GetTeachersDto"
Cohesion: 0.25
Nodes (7): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, Query

### Community 82 - "GetSchedulesDto"
Cohesion: 0.40
Nodes (5): GetSchedulesDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

### Community 83 - "CoverageStatus"
Cohesion: 0.40
Nodes (5): CoverageStatus, Complete, Empty, Exceeded, Incomplete

## Knowledge Gaps
- **247 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+242 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 847 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `school.service.ts`, `schedule.controller.ts`, `package.json`, `@nestjs/swagger`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `login.service.ts`, `period.service.ts`, `section.service.ts`, `@nestjs/testing`, `recovery-password.service.ts`, `audit.service.ts`, `app.module.ts`, `auth.controller.ts`, `Career`, `audit-path.util.ts`, `Public`, `teacher-degree.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `JwtAuth.guard.ts`, `CrudRepository`, `day.service.ts`, `teacher.service.ts`, `main.ts`, `transcript.parser.ts`?**
  _High betweenness centrality (0.280) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `school.service.ts`, `schedule.controller.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `period.service.ts`, `section.service.ts`, `@nestjs/common`, `@nestjs/testing`, `Teacher`, `audit.service.ts`, `auth.controller.ts`, `Career`, `Public`, `TeacherDegree`, `teacher-degree.service.ts`, `Department`, `ScheduleConflictsQueryDto`, `CrudRepository`, `day.service.ts`, `teacher.service.ts`, `main.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `teacher.service.ts`, `document.service.ts`, `school.service.ts`, `schedule.controller.ts`, `package.json`, `teacher-degree.service.ts`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `period.service.ts`, `section.service.ts`, `CrudRepository`, `day.service.ts`, `audit.service.ts`, `app.module.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _247 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `Classroom` be split into smaller, more focused modules?**
  _Cohesion score 0.05403348554033485 - nodes in this community are weakly interconnected._
- **Should `document.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06573426573426573 - nodes in this community are weakly interconnected._