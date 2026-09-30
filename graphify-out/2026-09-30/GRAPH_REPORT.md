# Graph Report - sigeit-api  (2026-09-30)

## Corpus Check
- 335 files · ~72,854 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2130 nodes · 5394 edges · 87 communities (82 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 177 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fb898230`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- Classroom
- TeacherService
- DocumentController
- School
- DayController
- career.service.ts
- period.service.ts
- schedule-time.util.ts
- package.json
- @nestjs/swagger
- schedule-planning.service.ts
- user.service.ts
- inscription.service.ts
- subject-demand.service.ts
- subject-demand.parser.ts
- section-teacher.service.ts
- SectionController
- typeorm
- @nestjs/common
- dependencies
- Delete
- devDependencies
- JwtAuthService
- Teacher
- ScheduleService
- audit.service.ts
- app.module.ts
- auth.controller.ts
- login.service.ts
- audit.module.ts
- InscriptionController
- subject.service.ts
- scripts
- Public
- UserService
- InscriptionService
- teacher.service.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- teacher-degree.service.ts
- audit-capture.service.ts
- Department
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- login.guard.ts
- AuditAction
- department.service.ts
- UserController
- CrudRepository
- .findByEntity
- Section
- AuditService
- TeacherDegreeService
- Contrato de estadísticas para frontend con Chart.js
- Inscription
- jest
- CreateTeacherDegreeDto
- day.service.ts
- README.md
- LoginUserResponseDto
- main.ts
- DayService
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- document.service.ts
- transcript-ai.reader.ts
- ScheduleConflictService
- openapitools.json
- DocumentService
- tsconfig.build.json
- DocumentE
- CreateSectionDto
- test.entity.ts
- SectionTeacherService
- @nestjs/testing
- property-diff.util.ts
- CoverageStatus
- CreateDocumentDto
- QueryBaseDto
- rxjs

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 98 edges
2. `@nestjs/common` - 82 edges
3. `class-validator` - 49 edges
4. `Section` - 45 edges
5. `class-transformer` - 44 edges
6. `Department` - 42 edges
7. `typeorm` - 41 edges
8. `@nestjs/typeorm` - 40 edges
9. `Subject` - 40 edges
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

## Communities (87 total, 5 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.12
Nodes (23): ApiConflictResponse, ApiOkResponse, DownloadPlannedSchedulesDto, ApiProperty, IsNumber, IsOptional, GetSchedulesDto, ApiPropertyOptional (+15 more)

### Community 2 - "Classroom"
Cohesion: 0.06
Nodes (46): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+38 more)

### Community 3 - "TeacherService"
Cohesion: 0.12
Nodes (14): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+6 more)

### Community 4 - "DocumentController"
Cohesion: 0.18
Nodes (9): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 5 - "School"
Cohesion: 0.10
Nodes (23): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, ResponseSchoolDto (+15 more)

### Community 6 - "DayController"
Cohesion: 0.18
Nodes (9): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 7 - "career.service.ts"
Cohesion: 0.06
Nodes (40): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+32 more)

### Community 8 - "period.service.ts"
Cohesion: 0.05
Nodes (42): IsDate, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty (+34 more)

### Community 9 - "schedule-time.util.ts"
Cohesion: 0.19
Nodes (15): toCoverage(), academicHours(), consecutiveBlocks(), findOverlaps(), overlaps(), peakLevel(), periodLimit(), periodSlots() (+7 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (45): author, description, engines, node, license, name, private, version (+37 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.10
Nodes (16): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity (+8 more)

### Community 12 - "schedule-planning.service.ts"
Cohesion: 0.13
Nodes (22): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_createscheduledto, src_repositories_schedule_dto_index_createschedulesbulkdto, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_downloadplannedschedulesdto, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto (+14 more)

### Community 13 - "user.service.ts"
Cohesion: 0.12
Nodes (22): src_auth_password_hasher_index_hashpassword, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional (+14 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.15
Nodes (16): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+8 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.09
Nodes (26): src_common_upload_index_uploadedfiledata, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type (+18 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.19
Nodes (12): exceljs, ref_stream, detectDelimiter(), isInteger(), locateColumns(), normalizeHeader(), ParsedDemand, parseDemandFile() (+4 more)

### Community 17 - "section-teacher.service.ts"
Cohesion: 0.10
Nodes (27): src_common_text_index_stripaccents, stripAccents(), src_repositories_section_dto_index_createsectiondto, src_repositories_section_dto_index_generatereportdto, src_repositories_section_dto_index_getsectionsdto, src_repositories_section_dto_index_getsectionteachersdto, src_repositories_section_dto_index_reportresponsedto, src_repositories_section_dto_index_responsesectiondto (+19 more)

### Community 18 - "SectionController"
Cohesion: 0.16
Nodes (16): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiOperation, ApiResponse (+8 more)

### Community 19 - "typeorm"
Cohesion: 0.10
Nodes (28): CreateDateColumn, OneToMany, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, InjectRepository (+20 more)

### Community 20 - "@nestjs/common"
Cohesion: 0.13
Nodes (22): @nestjs/common, @nestjs/typeorm, DayModule, Module, InscriptionModule, Module, PeriodModule, Module (+14 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.08
Nodes (23): Delete, SchoolController, ApiResponse, ApiTags, Body, Controller, Get, Param (+15 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "JwtAuthService"
Cohesion: 0.13
Nodes (9): ref_jsonwebtoken, passport-jwt, JWT_CONST, JwtAuthService, Injectable, JwtResult, Inject, JwtStrategy (+1 more)

### Community 25 - "Teacher"
Cohesion: 0.07
Nodes (44): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, ResponseTeacherDto, ApiProperty (+36 more)

### Community 26 - "ScheduleService"
Cohesion: 0.08
Nodes (23): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+15 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.18
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "app.module.ts"
Cohesion: 0.17
Nodes (10): @nestjs/config, AppController, Controller, Get, AppService, Injectable, AuthModule, Module (+2 more)

### Community 29 - "auth.controller.ts"
Cohesion: 0.06
Nodes (34): ref_express, ref_express_serve_static_core, Inject, ChangePasswordService, Inject, Injectable, ChangePasswordDto, ChangePasswordResponseDto (+26 more)

### Community 30 - "login.service.ts"
Cohesion: 0.14
Nodes (13): bcrypt, @nestjs/jwt, passport-local, src_auth_jwt_auth_index_jwt_const, src_auth_login_dto_index_loginuserresponsedto, src_auth_login_dto_index_userlogindto, UserLoginDto, LoginService (+5 more)

### Community 31 - "audit.module.ts"
Cohesion: 0.15
Nodes (10): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, AuditModule (+2 more)

### Community 32 - "InscriptionController"
Cohesion: 0.14
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 33 - "subject.service.ts"
Cohesion: 0.06
Nodes (39): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+31 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.12
Nodes (20): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Param (+12 more)

### Community 36 - "UserService"
Cohesion: 0.10
Nodes (19): ApiHideProperty, Exclude, hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 37 - "InscriptionService"
Cohesion: 0.12
Nodes (14): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, ResponseSectionDto (+6 more)

### Community 38 - "teacher.service.ts"
Cohesion: 0.09
Nodes (27): SubjectRefDto, CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum (+19 more)

### Community 39 - "SectionService"
Cohesion: 0.16
Nodes (8): GenerateReportDto, ApiProperty, IsNumber, IsOptional, IsString, SectionService, Injectable, InjectRepository

### Community 40 - "TeacherDegreeController"
Cohesion: 0.15
Nodes (16): UpdateTeacherDegreeDto, TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body (+8 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.13
Nodes (14): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Estructura de Archivos Generados, Flujo de Trabajo Recomendado, Generación Completa de Clientes (+6 more)

### Community 43 - "teacher-degree.service.ts"
Cohesion: 0.10
Nodes (26): src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdto, src_repositories_teacher_dto_index_responseteachergradesearchdto, src_repositories_teacher_dto_index_searchteachergradedto, src_repositories_teacher_dto_index_teachergradematchdto (+18 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "Department"
Cohesion: 0.20
Nodes (14): Career, Column, Entity, JoinColumn, ManyToMany, ManyToOne, src_repositories_career_entities_index_career, Department (+6 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.24
Nodes (14): Matches, FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean (+6 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.16
Nodes (7): @nestjs/passport, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (41): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+33 more)

### Community 52 - "UserController"
Cohesion: 0.17
Nodes (10): ApiResponse, ApiTags, Body, Controller, Get, Param, Patch, Post (+2 more)

### Community 53 - "CrudRepository"
Cohesion: 0.19
Nodes (4): PaginationDataDto, PaginationDto, pagination(), CrudRepository

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "Section"
Cohesion: 0.10
Nodes (26): Day, Column, Entity, src_repositories_day_entities_index_day, src_repositories_period_entities_index_period, Period, Column, Entity (+18 more)

### Community 56 - "AuditService"
Cohesion: 0.21
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "TeacherDegreeService"
Cohesion: 0.18
Nodes (10): ResponseTeacherDegreeDto, ResponseTeacherGradeDto, toSubjectRef(), ApiProperty, ApiPropertyOptional, assertGradesInScale(), normalizeSearchText(), TeacherDegreeService (+2 more)

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

### Community 62 - "day.service.ts"
Cohesion: 0.17
Nodes (10): src_common_use_case_index_crudrepository, CreateDayDto, ApiProperty, IsBoolean, IsNotEmpty, IsString, src_repositories_day_dto_index_createdaydto, src_repositories_day_dto_index_responsedaydto (+2 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "LoginUserResponseDto"
Cohesion: 0.32
Nodes (8): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type

### Community 65 - "main.ts"
Cohesion: 0.14
Nodes (10): Error de Generación de Clientes, Error de Generación de Swagger, Problemas de Compatibilidad, Solución de Problemas, cookie-parser, ref_fs, @nestjs/core, supertest (+2 more)

### Community 66 - "DayService"
Cohesion: 0.18
Nodes (9): DayService, Injectable, InjectRepository, ResponseDayDto, ApiProperty, IsBoolean, IsNotEmpty, IsString (+1 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.33
Nodes (6): download(), execute(), fs, https, ref_child_process, ref_https

### Community 70 - "document.service.ts"
Cohesion: 0.22
Nodes (8): DocumentModule, Module, src_repositories_document_document_service_periodservice, src_repositories_document_dto_index_createdocumentdto, src_repositories_document_dto_index_responsedocumentdto, src_repositories_document_dto_index_updatedocumentdto, UpdateDocumentDto, src_repositories_document_entities_index_documente

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.15
Nodes (18): pdf-parse, src_repositories_teacher_dto_index_teachergradedto, src_repositories_teacher_dto_index_transcriptpreviewdto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, buildRequest(), callModel() (+10 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.14
Nodes (18): AuditSummaryDto, ConflictPairDto, DayConflictsDto, FreeClassroomDto, FreeSlotDto, PeriodAuditDto, ScheduleConflictsDto, ScheduleLiteDto (+10 more)

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "DocumentService"
Cohesion: 0.22
Nodes (9): DocumentService, Injectable, ResponseDocumentDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "DocumentE"
Cohesion: 0.25
Nodes (6): InjectRepository, DocumentE, Column, Entity, JoinColumn, ManyToOne

### Community 77 - "CreateSectionDto"
Cohesion: 0.25
Nodes (8): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 83 - "CoverageStatus"
Cohesion: 0.40
Nodes (5): CoverageStatus, Complete, Empty, Exceeded, Incomplete

### Community 84 - "CreateDocumentDto"
Cohesion: 0.40
Nodes (5): CreateDocumentDto, ApiProperty, IsNotEmpty, IsString, Type

### Community 85 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

## Knowledge Gaps
- **252 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+247 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 857 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `School`, `career.service.ts`, `period.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `subject-demand.parser.ts`, `section-teacher.service.ts`, `Delete`, `JwtAuthService`, `audit.service.ts`, `app.module.ts`, `auth.controller.ts`, `login.service.ts`, `audit.module.ts`, `subject.service.ts`, `Public`, `teacher.service.ts`, `teacher-degree.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `login.guard.ts`, `department.service.ts`, `Section`, `day.service.ts`, `main.ts`, `document.service.ts`, `transcript-ai.reader.ts`?**
  _High betweenness centrality (0.315) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `Classroom`, `School`, `career.service.ts`, `period.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section-teacher.service.ts`, `Delete`, `Teacher`, `audit.service.ts`, `auth.controller.ts`, `subject.service.ts`, `Public`, `teacher.service.ts`, `teacher-degree.service.ts`, `Department`, `department.service.ts`, `Section`, `day.service.ts`, `main.ts`, `document.service.ts`, `ScheduleConflictService`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `School`, `career.service.ts`, `period.service.ts`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section-teacher.service.ts`, `audit.service.ts`, `app.module.ts`, `audit.module.ts`, `subject.service.ts`, `teacher.service.ts`, `teacher-degree.service.ts`, `department.service.ts`, `Section`, `day.service.ts`, `document.service.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _252 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleController` be split into smaller, more focused modules?**
  _Cohesion score 0.11861861861861862 - nodes in this community are weakly interconnected._
- **Should `Classroom` be split into smaller, more focused modules?**
  _Cohesion score 0.05516431924882629 - nodes in this community are weakly interconnected._