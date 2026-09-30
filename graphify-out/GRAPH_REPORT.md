# Graph Report - sigeit-api  (2026-09-30)

## Corpus Check
- 337 files · ~73,341 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2135 nodes · 5432 edges · 84 communities (77 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 179 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `900ecb22`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- Classroom
- TeacherService
- document.service.ts
- @nestjs/testing
- CrudRepository
- career.service.ts
- period.service.ts
- schedule-conflict.service.ts
- package.json
- @nestjs/swagger
- schedule-planning.service.ts
- user.service.ts
- inscription.service.ts
- subject-demand.service.ts
- subject-demand.parser.ts
- section.service.ts
- SectionController
- Subject
- @nestjs/common
- dependencies
- TestService
- devDependencies
- teacher-degree.service.ts
- response-teacher.dto.ts
- Schedule
- audit.service.ts
- app.module.ts
- change-password.service.ts
- auth.module.ts
- audit.module.ts
- InscriptionController
- subject.service.ts
- scripts
- Public
- UserService
- InscriptionService
- teacher/dto/index.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- SearchTeacherGradeDto
- audit-capture.service.ts
- typeorm
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- JwtAuthGuard
- AuditAction
- department.service.ts
- UserController
- pagination.ts
- .findByEntity
- Section
- AuditService
- TeacherDegreeService
- Contrato de estadísticas para frontend con Chart.js
- Inscription
- jest
- CreateTeacherDegreeDto
- schedule.service.ts
- README.md
- auth.controller.ts
- SubjectDemand
- CreateTeacherDto
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- Teacher
- transcript-ai.reader.ts
- ScheduleConflictService
- openapitools.json
- teacher.service.ts
- tsconfig.build.json
- ResponseTeacherDto
- engines
- test.entity.ts
- src_repositories_section_dto_index_sectionteachergradedto
- property-diff.util.ts
- QueryBaseDto
- rxjs

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 98 edges
2. `@nestjs/common` - 82 edges
3. `class-validator` - 49 edges
4. `Section` - 46 edges
5. `class-transformer` - 44 edges
6. `typeorm` - 42 edges
7. `Department` - 42 edges
8. `Subject` - 41 edges
9. `@nestjs/typeorm` - 40 edges
10. `Period` - 39 edges

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

## Communities (84 total, 7 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.19
Nodes (14): ApiConflictResponse, ApiOkResponse, ScheduleController, ApiOperation, ApiResponse, ApiTags, Body, Controller (+6 more)

### Community 2 - "Classroom"
Cohesion: 0.06
Nodes (46): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+38 more)

### Community 3 - "TeacherService"
Cohesion: 0.13
Nodes (13): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+5 more)

### Community 4 - "document.service.ts"
Cohesion: 0.06
Nodes (38): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+30 more)

### Community 5 - "@nestjs/testing"
Cohesion: 0.06
Nodes (35): @nestjs/testing, CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+27 more)

### Community 6 - "CrudRepository"
Cohesion: 0.06
Nodes (34): CrudRepository, DayController, ApiResponse, ApiTags, Body, Controller, Get, Param (+26 more)

### Community 7 - "career.service.ts"
Cohesion: 0.06
Nodes (39): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+31 more)

### Community 8 - "period.service.ts"
Cohesion: 0.05
Nodes (42): IsDate, Delete, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt (+34 more)

### Community 9 - "schedule-conflict.service.ts"
Cohesion: 0.13
Nodes (23): src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_scheduleconflictsdto, src_repositories_schedule_dto_index_scheduleconflictsquerydto, src_repositories_schedule_dto_index_schedulelitedto, src_repositories_schedule_entities_index_schedule, ScheduleCandidate, toCoverage(), academicHours() (+15 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (45): author, description, license, name, private, version, cookie-parser, ejs (+37 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.15
Nodes (8): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity

### Community 12 - "schedule-planning.service.ts"
Cohesion: 0.13
Nodes (25): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto, src_repositories_schedule_dto_index_periodauditdto, src_repositories_schedule_dto_index_planningperiodquerydto, src_repositories_schedule_dto_index_sectioncoveragedto, AuditSummaryDto (+17 more)

### Community 13 - "user.service.ts"
Cohesion: 0.11
Nodes (22): src_auth_password_hasher_index_hashpassword, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional (+14 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.13
Nodes (21): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+13 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.13
Nodes (18): @nestjs/platform-express, src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, ImportSubjectDemandResultDto (+10 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.14
Nodes (15): exceljs, ref_stream, src_common_text_index_stripaccents, normalizeText(), stripAccents(), detectDelimiter(), isInteger(), locateColumns() (+7 more)

### Community 17 - "section.service.ts"
Cohesion: 0.12
Nodes (19): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+11 more)

### Community 18 - "SectionController"
Cohesion: 0.11
Nodes (21): GenerateReportDto, ApiProperty, IsNumber, IsOptional, IsString, GetSectionsDto, ApiPropertyOptional, IsBooleanString (+13 more)

### Community 19 - "Subject"
Cohesion: 0.16
Nodes (10): SectionTeacherService, Injectable, InjectRepository, Subject, Column, Entity, JoinColumn, JoinTable (+2 more)

### Community 20 - "@nestjs/common"
Cohesion: 0.11
Nodes (24): @nestjs/common, @nestjs/typeorm, CareerModule, Module, DocumentModule, Module, InscriptionModule, Module (+16 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "TestService"
Cohesion: 0.13
Nodes (13): CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param, Patch (+5 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "teacher-degree.service.ts"
Cohesion: 0.14
Nodes (26): src_common_text_index_normalizetext, best(), bestGrades(), byRelevance(), GENERIC_WORDS, keyWords(), subjectFit(), TaughtHistory (+18 more)

### Community 25 - "response-teacher.dto.ts"
Cohesion: 0.11
Nodes (25): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, src_repositories_teacher_enum_index_employmentstatus, src_repositories_teacher_enum_index_hiringevaluationstatus (+17 more)

### Community 26 - "Schedule"
Cohesion: 0.08
Nodes (27): InjectRepository, CreateScheduleDto, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+19 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.18
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "app.module.ts"
Cohesion: 0.12
Nodes (12): @nestjs/core, AppController, Controller, Get, AppModule, Module, AppService, Injectable (+4 more)

### Community 29 - "change-password.service.ts"
Cohesion: 0.14
Nodes (12): Put, Req, ChangePasswordService, Inject, Injectable, ChangePasswordDto, ChangePasswordResponseDto, ApiProperty (+4 more)

### Community 30 - "auth.module.ts"
Cohesion: 0.05
Nodes (37): bcrypt, ref_express, ref_express_serve_static_core, ref_jsonwebtoken, @nestjs/jwt, @nestjs/passport, passport-jwt, passport-local (+29 more)

### Community 31 - "audit.module.ts"
Cohesion: 0.15
Nodes (10): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, AuditModule (+2 more)

### Community 32 - "InscriptionController"
Cohesion: 0.15
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 33 - "subject.service.ts"
Cohesion: 0.06
Nodes (37): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+29 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.12
Nodes (19): AuthController, ApiResponse, ApiTags, Body, Controller, Get, Inject, Param (+11 more)

### Community 36 - "UserService"
Cohesion: 0.10
Nodes (19): ApiHideProperty, Exclude, hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 37 - "InscriptionService"
Cohesion: 0.11
Nodes (14): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, ResponseSectionDto (+6 more)

### Community 38 - "teacher/dto/index.ts"
Cohesion: 0.15
Nodes (14): GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type, SubjectRefDto, TeacherGradeMatchDto (+6 more)

### Community 40 - "TeacherDegreeController"
Cohesion: 0.15
Nodes (16): UpdateTeacherDegreeDto, TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body (+8 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.11
Nodes (18): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Error de Generación de Clientes, Error de Generación de Swagger, Estructura de Archivos Generados (+10 more)

### Community 43 - "SearchTeacherGradeDto"
Cohesion: 0.18
Nodes (11): ResponseTeacherGradeSearchDto, SearchTeacherGradeDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString (+3 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "typeorm"
Cohesion: 0.15
Nodes (20): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, Career, Column (+12 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.12
Nodes (17): GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, SubjectDemandController, ApiBody, ApiConsumes, ApiOperation (+9 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.24
Nodes (14): Matches, FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean (+6 more)

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (41): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+33 more)

### Community 52 - "UserController"
Cohesion: 0.17
Nodes (10): ApiResponse, ApiTags, Body, Controller, Get, Param, Patch, Post (+2 more)

### Community 53 - "pagination.ts"
Cohesion: 0.36
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "Section"
Cohesion: 0.17
Nodes (13): src_repositories_period_entities_index_period, Period, Column, Entity, InjectRepository, src_repositories_section_entities_index_section, Section, Column (+5 more)

### Community 56 - "AuditService"
Cohesion: 0.21
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
Cohesion: 0.20
Nodes (15): IsPositive, CreateTeacherDegreeDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray, IsDateString, IsEnum (+7 more)

### Community 62 - "schedule.service.ts"
Cohesion: 0.09
Nodes (21): src_common_use_case_index_crudrepository, CreateSchedulesBulkDto, ApiProperty, ArrayNotEmpty, IsArray, IsInt, DownloadPlannedSchedulesDto, ApiProperty (+13 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.controller.ts"
Cohesion: 0.10
Nodes (21): src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional (+13 more)

### Community 65 - "SubjectDemand"
Cohesion: 0.14
Nodes (12): ResponseSubjectDemandDto, ApiProperty, SubjectDemand, Column, Entity, JoinColumn, ManyToOne, DemandRow (+4 more)

### Community 66 - "CreateTeacherDto"
Cohesion: 0.12
Nodes (16): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+8 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.29
Nodes (7): download(), execute(), fs, https, ref_child_process, ref_fs, ref_https

### Community 70 - "Teacher"
Cohesion: 0.13
Nodes (13): OneToMany, TeacherDegree, Column, Entity, JoinColumn, ManyToOne, Teacher, Column (+5 more)

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.15
Nodes (18): pdf-parse, src_repositories_teacher_dto_index_teachergradedto, src_repositories_teacher_dto_index_transcriptpreviewdto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, buildRequest(), callModel() (+10 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.19
Nodes (7): ScheduleConflictService, Injectable, SchedulePlanningService, Injectable, InjectRepository, ConflictContext, findOverlaps()

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "teacher.service.ts"
Cohesion: 0.24
Nodes (7): src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_responsesubjecthistorydto, src_repositories_teacher_dto_index_updateteacherdto, ResponseSubjectHistoryDto, ApiProperty, UpdateTeacherDto

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "ResponseTeacherDto"
Cohesion: 0.20
Nodes (9): ResponseTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 85 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

## Knowledge Gaps
- **253 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 859 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `@nestjs/testing`, `CrudRepository`, `career.service.ts`, `period.service.ts`, `schedule-conflict.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `TestService`, `teacher-degree.service.ts`, `audit.service.ts`, `app.module.ts`, `change-password.service.ts`, `auth.module.ts`, `audit.module.ts`, `subject.service.ts`, `Public`, `audit-capture.service.ts`, `mail.service.ts`, `department.service.ts`, `Section`, `schedule.service.ts`, `auth.controller.ts`, `transcript-ai.reader.ts`, `teacher.service.ts`?**
  _High betweenness centrality (0.294) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `@nestjs/testing`, `CrudRepository`, `career.service.ts`, `period.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `TestService`, `teacher-degree.service.ts`, `response-teacher.dto.ts`, `audit.service.ts`, `app.module.ts`, `subject.service.ts`, `Public`, `teacher/dto/index.ts`, `typeorm`, `department.service.ts`, `Section`, `auth.controller.ts`, `teacher.service.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `@nestjs/testing`, `CrudRepository`, `career.service.ts`, `period.service.ts`, `schedule-conflict.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `teacher-degree.service.ts`, `audit.service.ts`, `app.module.ts`, `audit.module.ts`, `subject.service.ts`, `department.service.ts`, `Section`, `schedule.service.ts`, `teacher.service.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _253 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `Classroom` be split into smaller, more focused modules?**
  _Cohesion score 0.05516431924882629 - nodes in this community are weakly interconnected._
- **Should `TeacherService` be split into smaller, more focused modules?**
  _Cohesion score 0.1310344827586207 - nodes in this community are weakly interconnected._