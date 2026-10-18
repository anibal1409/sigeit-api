# Graph Report - sigeit-api  (2026-10-18)

## Corpus Check
- 348 files · ~76,882 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2210 nodes · 5639 edges · 85 communities (81 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ff7e86a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- Classroom
- TeacherService
- document.service.ts
- SchoolService
- DayController
- career.service.ts
- Period
- schedule-planning.service.ts
- package.json
- @nestjs/swagger
- schedule-planning-response.dto.ts
- user.service.ts
- inscription.service.ts
- subject-demand.service.ts
- subject-demand.parser.ts
- section.service.ts
- SectionController
- Subject
- repositories.module.ts
- dependencies
- Delete
- devDependencies
- section-teacher.service.ts
- response-teacher.dto.ts
- Schedule
- audit.service.ts
- @nestjs/common
- @nestjs/testing
- login.service.ts
- audit.module.ts
- setting.service.ts
- CrudRepository
- scripts
- Public
- UserService
- ResponseSectionDto
- degree-summary.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- create-teacher-degree.dto.ts
- audit-capture.service.ts
- Department
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- JwtAuthGuard
- AuditAction
- department.service.ts
- schedule.controller.ts
- pagination.ts
- .findByEntity
- Section
- AuditService
- teacher-degree.service.ts
- Contrato de estadísticas para frontend con Chart.js
- day.service.ts
- jest
- CreateTeacherDegreeDto
- schedule.module.ts
- README.md
- auth.controller.ts
- CreateTeacherDto
- school.service.ts
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- typeorm
- transcript-ai.reader.ts
- ScheduleConflictService
- openapitools.json
- LoginUserResponseDto
- tsconfig.build.json
- User
- ResponseTeacherDto
- test.entity.ts
- src_repositories_section_dto_index_sectionteachergradedto
- DayService
- property-diff.util.ts
- TeacherDegreeService
- QueryBaseDto

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 101 edges
2. `@nestjs/common` - 85 edges
3. `class-validator` - 50 edges
4. `Section` - 46 edges
5. `class-transformer` - 44 edges
6. `typeorm` - 44 edges
7. `@nestjs/typeorm` - 42 edges
8. `Department` - 42 edges
9. `Subject` - 41 edges
10. `IdEntity` - 39 edges

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

## Communities (85 total, 4 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.19
Nodes (14): ApiConflictResponse, ApiOkResponse, ScheduleController, ApiOperation, ApiResponse, ApiTags, Body, Controller (+6 more)

### Community 2 - "Classroom"
Cohesion: 0.06
Nodes (44): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+36 more)

### Community 3 - "TeacherService"
Cohesion: 0.13
Nodes (13): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+5 more)

### Community 4 - "document.service.ts"
Cohesion: 0.06
Nodes (38): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+30 more)

### Community 5 - "SchoolService"
Cohesion: 0.10
Nodes (19): ResponseSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+11 more)

### Community 6 - "DayController"
Cohesion: 0.18
Nodes (9): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 7 - "career.service.ts"
Cohesion: 0.06
Nodes (38): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+30 more)

### Community 8 - "Period"
Cohesion: 0.05
Nodes (47): IsDate, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty (+39 more)

### Community 9 - "schedule-planning.service.ts"
Cohesion: 0.12
Nodes (30): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto, src_repositories_schedule_dto_index_periodauditdto, src_repositories_schedule_dto_index_planningperiodquerydto, src_repositories_schedule_dto_index_scheduleconflictsdto, src_repositories_schedule_dto_index_schedulelitedto (+22 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (47): author, description, engines, node, license, name, private, version (+39 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.17
Nodes (8): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity

### Community 12 - "schedule-planning-response.dto.ts"
Cohesion: 0.18
Nodes (16): AuditSummaryDto, ConflictPairDto, CoverageStatus, Complete, Empty, Exceeded, Incomplete, DayConflictsDto (+8 more)

### Community 13 - "user.service.ts"
Cohesion: 0.12
Nodes (22): src_auth_password_hasher_index_hashpassword, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional (+14 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.05
Nodes (51): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, CreateInscriptionDto, ApiProperty, IsNotEmpty (+43 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.11
Nodes (23): UploadedFileData, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto, ApiProperty, src_repositories_subject_demand_dto_index_getsubjectdemanddto (+15 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.14
Nodes (14): exceljs, ref_stream, src_common_text_index_stripaccents, stripAccents(), detectDelimiter(), isInteger(), locateColumns(), normalizeHeader() (+6 more)

### Community 17 - "section.service.ts"
Cohesion: 0.11
Nodes (22): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+14 more)

### Community 18 - "SectionController"
Cohesion: 0.15
Nodes (16): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiOperation, ApiResponse (+8 more)

### Community 19 - "Subject"
Cohesion: 0.10
Nodes (20): OneToMany, InjectRepository, Subject, Column, Entity, JoinColumn, JoinTable, ManyToMany (+12 more)

### Community 20 - "repositories.module.ts"
Cohesion: 0.06
Nodes (32): CareerModule, Module, ClassroomModule, Module, DayModule, Module, DepartmentModule, Module (+24 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.12
Nodes (14): Delete, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "section-teacher.service.ts"
Cohesion: 0.11
Nodes (22): src_repositories_section_dto_index_getsectionteachersdto, src_repositories_section_dto_index_responsesectionteacherdto, GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type (+14 more)

### Community 25 - "response-teacher.dto.ts"
Cohesion: 0.11
Nodes (25): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, src_repositories_teacher_enum_index_employmentstatus, src_repositories_teacher_enum_index_hiringevaluationstatus (+17 more)

### Community 26 - "Schedule"
Cohesion: 0.11
Nodes (18): ResponseScheduleDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, Schedule (+10 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.18
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "@nestjs/common"
Cohesion: 0.12
Nodes (15): cookie-parser, ref_fs, @nestjs/common, @nestjs/config, @nestjs/core, supertest, AppController, Controller (+7 more)

### Community 29 - "@nestjs/testing"
Cohesion: 0.12
Nodes (6): @nestjs/testing, Inject, JwtAuthService, Injectable, Inject, Inject

### Community 30 - "login.service.ts"
Cohesion: 0.07
Nodes (23): bcrypt, ref_express, ref_express_serve_static_core, @nestjs/passport, passport-local, getDefaultCokieOptions(), src_auth_cookies_index_getdefaultcokieoptions, src_auth_jwt_auth_index_jwt_const (+15 more)

### Community 31 - "audit.module.ts"
Cohesion: 0.15
Nodes (10): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, AuditModule (+2 more)

### Community 32 - "setting.service.ts"
Cohesion: 0.08
Nodes (28): MaxLength, src_repositories_setting_dto_index_responsesettingdto, src_repositories_setting_dto_index_updatesettingdto, ResponseSettingDto, ApiProperty, ApiPropertyOptional, ApiPropertyOptional, IsInt (+20 more)

### Community 33 - "CrudRepository"
Cohesion: 0.06
Nodes (38): CrudRepository, CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type (+30 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.09
Nodes (28): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Inject (+20 more)

### Community 36 - "UserService"
Cohesion: 0.09
Nodes (20): hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, UserRespondeDto (+12 more)

### Community 37 - "ResponseSectionDto"
Cohesion: 0.25
Nodes (7): ResponseSectionDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 38 - "degree-summary.ts"
Cohesion: 0.17
Nodes (18): src_common_text_index_normalizetext, normalizeText(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey(), summarizeGrades() (+10 more)

### Community 39 - "SectionService"
Cohesion: 0.22
Nodes (3): SectionService, Injectable, InjectRepository

### Community 40 - "TeacherDegreeController"
Cohesion: 0.16
Nodes (15): TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body, Controller (+7 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.11
Nodes (18): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Error de Generación de Clientes, Error de Generación de Swagger, Estructura de Archivos Generados (+10 more)

### Community 43 - "create-teacher-degree.dto.ts"
Cohesion: 0.20
Nodes (10): DEGREE_FIELDS, SubjectRefDto, TeacherGradeMatchDto, src_repositories_teacher_enum_index_degreelevel, DegreeLevel, Doctorate, Master, Other (+2 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "Department"
Cohesion: 0.20
Nodes (14): Career, Column, Entity, JoinColumn, ManyToMany, ManyToOne, src_repositories_career_entities_index_career, Department (+6 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, MailModule, Module, MailService, Injectable, recovery(), welcome(), InjectRepository

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.20
Nodes (15): FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean, IsInt (+7 more)

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (39): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+31 more)

### Community 52 - "schedule.controller.ts"
Cohesion: 0.08
Nodes (32): src_common_use_case_index_crudrepository, CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean (+24 more)

### Community 53 - "pagination.ts"
Cohesion: 0.36
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "Section"
Cohesion: 0.14
Nodes (21): @nestjs/typeorm, src_repositories_section_entities_index_section, Section, Column, Entity, JoinColumn, ManyToOne, src_repositories_subject_entities_index_subject (+13 more)

### Community 56 - "AuditService"
Cohesion: 0.21
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "teacher-degree.service.ts"
Cohesion: 0.09
Nodes (28): src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_pickdegreefields, src_repositories_teacher_dto_index_responseteacherdegreedto (+20 more)

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "day.service.ts"
Cohesion: 0.21
Nodes (9): CreateDayDto, ApiProperty, IsBoolean, IsNotEmpty, IsString, src_repositories_day_dto_index_createdaydto, src_repositories_day_dto_index_responsedaydto, src_repositories_day_dto_index_updatedaydto (+1 more)

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.21
Nodes (18): IsPositive, CreateTeacherDegreeDto, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean (+10 more)

### Community 62 - "schedule.module.ts"
Cohesion: 0.20
Nodes (7): InjectRepository, Day, Column, Entity, src_repositories_day_entities_index_day, ScheduleModule, Module

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.controller.ts"
Cohesion: 0.07
Nodes (26): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, src_auth_change_password_dto_index_changepasswordresponsedto, src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice, JWT_CONST (+18 more)

### Community 65 - "CreateTeacherDto"
Cohesion: 0.14
Nodes (14): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+6 more)

### Community 66 - "school.service.ts"
Cohesion: 0.24
Nodes (9): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, UpdateSchoolDto (+1 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.33
Nodes (6): download(), execute(), fs, https, ref_child_process, ref_https

### Community 70 - "typeorm"
Cohesion: 0.27
Nodes (7): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, UpdateDateColumn

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.14
Nodes (23): pdf-parse, src_repositories_teacher_dto_index_teacherdegreeperioddto, src_repositories_teacher_dto_index_teachergradedto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, buildRequest(), callModel() (+15 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.21
Nodes (5): ScheduleConflictService, Injectable, SchedulePlanningService, Injectable, InjectRepository

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "LoginUserResponseDto"
Cohesion: 0.32
Nodes (8): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "User"
Cohesion: 0.14
Nodes (13): ApiHideProperty, Exclude, School, Column, Entity, InjectRepository, InjectRepository, Column (+5 more)

### Community 77 - "ResponseTeacherDto"
Cohesion: 0.13
Nodes (14): ResponseTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+6 more)

### Community 81 - "DayService"
Cohesion: 0.24
Nodes (8): DayService, Injectable, ResponseDayDto, ApiProperty, IsBoolean, IsNotEmpty, IsString, Type

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 83 - "TeacherDegreeService"
Cohesion: 0.35
Nodes (6): pickDegreeFields(), ResponseTeacherDegreeDto, assertInScale(), TeacherDegreeService, toGradeEntity(), Injectable

### Community 85 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

## Knowledge Gaps
- **258 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+253 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 885 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `career.service.ts`, `Period`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `repositories.module.ts`, `Delete`, `section-teacher.service.ts`, `audit.service.ts`, `login.service.ts`, `audit.module.ts`, `setting.service.ts`, `CrudRepository`, `Public`, `audit-capture.service.ts`, `mail.service.ts`, `department.service.ts`, `schedule.controller.ts`, `Section`, `teacher-degree.service.ts`, `day.service.ts`, `schedule.module.ts`, `auth.controller.ts`, `CreateTeacherDto`, `school.service.ts`, `transcript-ai.reader.ts`?**
  _High betweenness centrality (0.291) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `career.service.ts`, `Period`, `package.json`, `schedule-planning-response.dto.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `Delete`, `response-teacher.dto.ts`, `audit.service.ts`, `@nestjs/common`, `setting.service.ts`, `CrudRepository`, `Public`, `create-teacher-degree.dto.ts`, `Department`, `ScheduleConflictsQueryDto`, `department.service.ts`, `schedule.controller.ts`, `Section`, `teacher-degree.service.ts`, `day.service.ts`, `schedule.module.ts`, `auth.controller.ts`, `CreateTeacherDto`, `school.service.ts`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `Section` to `statistics.service.ts`, `Classroom`, `document.service.ts`, `career.service.ts`, `Period`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `section-teacher.service.ts`, `audit.service.ts`, `@nestjs/common`, `audit.module.ts`, `setting.service.ts`, `CrudRepository`, `department.service.ts`, `schedule.controller.ts`, `teacher-degree.service.ts`, `day.service.ts`, `schedule.module.ts`, `school.service.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _258 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056856187290969896 - nodes in this community are weakly interconnected._
- **Should `Classroom` be split into smaller, more focused modules?**
  _Cohesion score 0.05755693581780538 - nodes in this community are weakly interconnected._
- **Should `TeacherService` be split into smaller, more focused modules?**
  _Cohesion score 0.12688172043010754 - nodes in this community are weakly interconnected._