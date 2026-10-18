# Graph Report - sigeit-api  (2026-10-18)

## Corpus Check
- 349 files · ~77,142 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2215 nodes · 5644 edges · 87 communities (83 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ff7e86a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- @nestjs/testing
- TeacherController
- document.service.ts
- School
- day.service.ts
- Career
- Period
- schedule-planning.service.ts
- package.json
- @nestjs/swagger
- schedule-planning-response.dto.ts
- user.service.ts
- inscription.service.ts
- SubjectDemand
- subject-demand.parser.ts
- section.service.ts
- SectionController
- teacher-degree.service.ts
- repositories.module.ts
- dependencies
- Delete
- devDependencies
- SectionTeacherService
- response-teacher.dto.ts
- ScheduleService
- audit.service.ts
- @nestjs/common
- recovery-password.service.ts
- LoginService
- audit.module.ts
- setting.service.ts
- subject.service.ts
- scripts
- Public
- UserService
- InscriptionService
- degree-summary.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- DegreeLevel
- audit-capture.service.ts
- CreateUserDto
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- login.guard.ts
- AuditAction
- department.service.ts
- schedule.controller.ts
- common/index.ts
- .findByEntity
- Teacher
- AuditService
- subject-demand.service.ts
- Contrato de estadísticas para frontend con Chart.js
- InscriptionController
- jest
- CreateTeacherDegreeDto
- Section
- README.md
- auth.controller.ts
- SubjectController
- RecoveryPasswordResponseDto
- GetAuditLogsDto
- nest-cli.json
- .update
- typeorm
- transcript-ai.reader.ts
- Schedule
- openapitools.json
- LoginUserResponseDto
- tsconfig.build.json
- User
- SearchTeacherGradeDto
- test.entity.ts
- src_repositories_section_dto_index_sectionteachergradedto
- UpdateSettingDto
- property-diff.util.ts
- TeacherDegreeService
- Roles
- TranscriptPreviewDto
- CLAUDE.md

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

## Communities (87 total, 4 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.19
Nodes (14): ApiConflictResponse, ApiOkResponse, ScheduleController, ApiOperation, ApiResponse, ApiTags, Body, Controller (+6 more)

### Community 2 - "@nestjs/testing"
Cohesion: 0.05
Nodes (45): @nestjs/testing, CrudRepository, ClassroomController, ApiResponse, ApiTags, Body, Controller, Get (+37 more)

### Community 3 - "TeacherController"
Cohesion: 0.16
Nodes (11): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+3 more)

### Community 4 - "document.service.ts"
Cohesion: 0.06
Nodes (38): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+30 more)

### Community 5 - "School"
Cohesion: 0.07
Nodes (32): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, ResponseSchoolDto (+24 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (31): src_common_use_case_index_crudrepository, DayController, ApiResponse, ApiTags, Body, Controller, Get, Param (+23 more)

### Community 7 - "Career"
Cohesion: 0.06
Nodes (45): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+37 more)

### Community 8 - "Period"
Cohesion: 0.05
Nodes (45): IsDate, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty (+37 more)

### Community 9 - "schedule-planning.service.ts"
Cohesion: 0.13
Nodes (24): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_planningperiodquerydto, src_repositories_schedule_dto_index_schedulelitedto, src_repositories_schedule_dto_index_sectioncoveragedto, ScheduleCandidate, ConflictPairs (+16 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (44): author, description, engines, node, license, name, private, version (+36 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.13
Nodes (12): class-transformer, class-validator, @nestjs/swagger, QueryBaseDto, ApiPropertyOptional, Type, IdCreateEntity, ApiProperty (+4 more)

### Community 12 - "schedule-planning-response.dto.ts"
Cohesion: 0.19
Nodes (15): AuditSummaryDto, ConflictPairDto, CoverageStatus, Complete, Empty, Exceeded, Incomplete, DayConflictsDto (+7 more)

### Community 13 - "user.service.ts"
Cohesion: 0.28
Nodes (6): src_auth_password_hasher_index_hashpassword, src_repositories_user_dto_index_userrespondedto, UpdateUserDto, src_repositories_user_entities_index_user, src_repositories_user_enums_index_roles, ROLES_LIST

### Community 14 - "inscription.service.ts"
Cohesion: 0.10
Nodes (27): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+19 more)

### Community 15 - "SubjectDemand"
Cohesion: 0.14
Nodes (12): ResponseSubjectDemandDto, ApiProperty, SubjectDemand, Column, Entity, JoinColumn, ManyToOne, DemandRow (+4 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.15
Nodes (14): exceljs, ref_stream, src_common_text_index_stripaccents, stripAccents(), detectDelimiter(), isInteger(), locateColumns(), normalizeHeader() (+6 more)

### Community 17 - "section.service.ts"
Cohesion: 0.10
Nodes (24): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+16 more)

### Community 18 - "SectionController"
Cohesion: 0.16
Nodes (16): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiOperation, ApiResponse (+8 more)

### Community 19 - "teacher-degree.service.ts"
Cohesion: 0.07
Nodes (50): OneToMany, @nestjs/typeorm, src_common_text_index_normalizetext, ResponseSectionTeacherDto, ApiProperty, best(), bestGrades(), byRelevance() (+42 more)

### Community 20 - "repositories.module.ts"
Cohesion: 0.06
Nodes (30): CareerModule, Module, ClassroomModule, Module, DayModule, Module, DepartmentModule, Module (+22 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.12
Nodes (14): Delete, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "SectionTeacherService"
Cohesion: 0.22
Nodes (6): GetSectionTeachersDto, ApiPropertyOptional, IsOptional, Type, SectionTeacherService, Injectable

### Community 25 - "response-teacher.dto.ts"
Cohesion: 0.07
Nodes (41): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+33 more)

### Community 26 - "ScheduleService"
Cohesion: 0.13
Nodes (11): ResponseScheduleDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, ScheduleService (+3 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.18
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "@nestjs/common"
Cohesion: 0.14
Nodes (12): cookie-parser, @nestjs/common, @nestjs/config, @nestjs/core, supertest, AppController, Controller, Get (+4 more)

### Community 29 - "recovery-password.service.ts"
Cohesion: 0.12
Nodes (11): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, src_auth_change_password_dto_index_changepasswordresponsedto, JWT_CONST, src_auth_jwt_auth_index_jwtauthservice, JwtAuthService, Injectable (+3 more)

### Community 30 - "LoginService"
Cohesion: 0.19
Nodes (7): passport-local, UserLoginDto, LoginService, Inject, Injectable, LocalStrategy, Injectable

### Community 31 - "audit.module.ts"
Cohesion: 0.15
Nodes (10): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, AuditModule (+2 more)

### Community 32 - "setting.service.ts"
Cohesion: 0.17
Nodes (12): src_repositories_setting_dto_index_responsesettingdto, src_repositories_setting_dto_index_updatesettingdto, ResponseSettingDto, ApiProperty, ApiPropertyOptional, src_repositories_setting_entities_index_setting, Setting, Column (+4 more)

### Community 33 - "subject.service.ts"
Cohesion: 0.09
Nodes (22): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, src_repositories_subject_dto_index_createsubjectdto (+14 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.16
Nodes (18): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Param (+10 more)

### Community 36 - "UserService"
Cohesion: 0.17
Nodes (10): hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, UserRespondeDto (+2 more)

### Community 37 - "InscriptionService"
Cohesion: 0.11
Nodes (14): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, ResponseSectionDto (+6 more)

### Community 38 - "degree-summary.ts"
Cohesion: 0.18
Nodes (17): normalizeText(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey(), summarizeGrades(), ResponseTeacherGradeDto (+9 more)

### Community 39 - "SectionService"
Cohesion: 0.22
Nodes (4): Inject, InjectRepository, SectionService, Injectable

### Community 40 - "TeacherDegreeController"
Cohesion: 0.16
Nodes (15): TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body, Controller (+7 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.11
Nodes (18): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Error de Generación de Clientes, Error de Generación de Swagger, Estructura de Archivos Generados (+10 more)

### Community 43 - "DegreeLevel"
Cohesion: 0.33
Nodes (6): DegreeLevel, Doctorate, Master, Other, Specialization, Undergraduate

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "CreateUserDto"
Cohesion: 0.10
Nodes (19): CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.12
Nodes (17): GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, SubjectDemandController, ApiBody, ApiConsumes, ApiOperation (+9 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.20
Nodes (15): FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean, IsInt (+7 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.13
Nodes (9): @nestjs/passport, rxjs, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable (+1 more)

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (39): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+31 more)

### Community 52 - "schedule.controller.ts"
Cohesion: 0.07
Nodes (33): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+25 more)

### Community 53 - "common/index.ts"
Cohesion: 0.31
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "Teacher"
Cohesion: 0.09
Nodes (24): src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_responsesubjecthistorydto, src_repositories_teacher_dto_index_updateteacherdto, ResponseSubjectHistoryDto, ApiProperty, ResponseTeacherDto, ApiProperty (+16 more)

### Community 56 - "AuditService"
Cohesion: 0.21
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "subject-demand.service.ts"
Cohesion: 0.14
Nodes (18): @nestjs/platform-express, src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, ImportSubjectDemandResultDto (+10 more)

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "InscriptionController"
Cohesion: 0.14
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 60 - "jest"
Cohesion: 0.12
Nodes (16): download(), execute(), fs, https, jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions (+8 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.17
Nodes (20): IsPositive, CreateTeacherDegreeDto, DEGREE_FIELDS, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray (+12 more)

### Community 62 - "Section"
Cohesion: 0.17
Nodes (15): src_repositories_classroom_entities_index_classroom, src_repositories_day_entities_index_day, src_repositories_period_entities_index_period, src_repositories_schedule_dto_index_scheduleconflictsdto, src_repositories_schedule_entities_index_schedule, ScheduleModule, Module, ConflictContext (+7 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.controller.ts"
Cohesion: 0.06
Nodes (31): bcrypt, ref_express, ref_express_serve_static_core, AuthModule, Module, src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice (+23 more)

### Community 65 - "SubjectController"
Cohesion: 0.13
Nodes (15): GetSubjectDepartmentDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SubjectController, ApiResponse, ApiTags (+7 more)

### Community 66 - "RecoveryPasswordResponseDto"
Cohesion: 0.15
Nodes (11): Inject, ChangePasswordService, Inject, Injectable, RecoveryPasswordDto, RecoveryPasswordResponseDto, ApiProperty, IsNotEmpty (+3 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - ".update"
Cohesion: 0.16
Nodes (11): ApiBadRequestResponse, ApiForbiddenResponse, SettingController, ApiOperation, ApiResponse, ApiTags, Body, Controller (+3 more)

### Community 70 - "typeorm"
Cohesion: 0.18
Nodes (14): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, Department, Column (+6 more)

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.17
Nodes (20): pdf-parse, src_repositories_teacher_dto_index_teacherdegreeperioddto, src_repositories_teacher_dto_index_teachergradedto, src_repositories_teacher_dto_index_transcriptpreviewdto, buildRequest(), callModel(), failure(), FALLBACK_STATUS (+12 more)

### Community 72 - "Schedule"
Cohesion: 0.11
Nodes (15): FreeSlotDto, Schedule, Column, Entity, JoinColumn, ManyToOne, ScheduleConflictService, Injectable (+7 more)

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
Cohesion: 0.20
Nodes (9): ApiHideProperty, Exclude, Column, Entity, Index, JoinColumn, ManyToOne, User (+1 more)

### Community 77 - "SearchTeacherGradeDto"
Cohesion: 0.18
Nodes (11): ResponseTeacherGradeSearchDto, SearchTeacherGradeDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString (+3 more)

### Community 81 - "UpdateSettingDto"
Cohesion: 0.22
Nodes (9): MaxLength, ApiPropertyOptional, IsInt, IsOptional, IsString, Matches, Max, Min (+1 more)

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 83 - "TeacherDegreeService"
Cohesion: 0.35
Nodes (6): pickDegreeFields(), ResponseTeacherDegreeDto, assertInScale(), TeacherDegreeService, toGradeEntity(), Injectable

### Community 84 - "Roles"
Cohesion: 0.29
Nodes (7): Roles, Administrator, Director, HeadDepartment, Planner, Student, Teacher

### Community 85 - "TranscriptPreviewDto"
Cohesion: 0.50
Nodes (3): TranscriptPreviewDto, ApiProperty, ApiPropertyOptional

## Knowledge Gaps
- **259 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+254 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 889 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `@nestjs/testing`, `document.service.ts`, `School`, `day.service.ts`, `Career`, `Period`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `teacher-degree.service.ts`, `repositories.module.ts`, `Delete`, `audit.service.ts`, `recovery-password.service.ts`, `LoginService`, `audit.module.ts`, `setting.service.ts`, `subject.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `login.guard.ts`, `department.service.ts`, `schedule.controller.ts`, `Teacher`, `subject-demand.service.ts`, `Section`, `auth.controller.ts`, `transcript-ai.reader.ts`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `@nestjs/testing`, `document.service.ts`, `School`, `day.service.ts`, `Career`, `Period`, `package.json`, `schedule-planning-response.dto.ts`, `user.service.ts`, `inscription.service.ts`, `section.service.ts`, `teacher-degree.service.ts`, `Delete`, `response-teacher.dto.ts`, `audit.service.ts`, `@nestjs/common`, `setting.service.ts`, `subject.service.ts`, `ScheduleConflictsQueryDto`, `department.service.ts`, `schedule.controller.ts`, `Teacher`, `subject-demand.service.ts`, `CreateTeacherDegreeDto`, `Section`, `auth.controller.ts`, `RecoveryPasswordResponseDto`, `typeorm`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `teacher-degree.service.ts` to `statistics.service.ts`, `@nestjs/testing`, `document.service.ts`, `School`, `day.service.ts`, `Career`, `Period`, `schedule-planning.service.ts`, `package.json`, `user.service.ts`, `inscription.service.ts`, `section.service.ts`, `audit.service.ts`, `@nestjs/common`, `audit.module.ts`, `setting.service.ts`, `subject.service.ts`, `department.service.ts`, `schedule.controller.ts`, `Teacher`, `subject-demand.service.ts`, `Section`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _259 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055633473585787754 - nodes in this community are weakly interconnected._
- **Should `@nestjs/testing` be split into smaller, more focused modules?**
  _Cohesion score 0.05046948356807512 - nodes in this community are weakly interconnected._
- **Should `document.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06277436347673397 - nodes in this community are weakly interconnected._