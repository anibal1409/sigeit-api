# Graph Report - sigeit-api  (2026-10-18)

## Corpus Check
- 357 files · ~80,682 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2293 nodes · 5909 edges · 101 communities (95 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec509747`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- Classroom
- teacher.service.ts
- DocumentController
- @nestjs/testing
- day.service.ts
- CareerController
- period.service.ts
- schedule-planning.service.ts
- package.json
- @nestjs/swagger
- Section
- user.service.ts
- inscription.service.ts
- SubjectDemand
- subject-demand.parser.ts
- section.service.ts
- SectionController
- section-teacher.service.ts
- @nestjs/common
- dependencies
- TestService
- devDependencies
- DocumentService
- Teacher
- Schedule
- audit.service.ts
- app.module.ts
- auth.controller.ts
- schedule.controller.ts
- audit.module.ts
- Setting
- Subject
- scripts
- Public
- department-setting.service.ts
- InscriptionService
- response-teacher-degree.dto.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- DegreeLevel
- audit-capture.service.ts
- UserService
- mail.service.ts
- .import
- UserController
- login.guard.ts
- AuditAction
- DepartmentService
- schedule-planning-response.dto.ts
- pagination.ts
- GetAuditLogsDto
- TeacherController
- AuditService
- subject-demand.service.ts
- Contrato de estadísticas para frontend con Chart.js
- Delete
- jest
- CreateTeacherDegreeDto
- TypeDocument
- README.md
- auth.module.ts
- DepartmentSettingService
- recovery-password.service.ts
- CreateTeacherDto
- nest-cli.json
- .reserveOfficeNumbers
- Department
- transcript-ai.reader.ts
- ScheduleConflictService
- openapitools.json
- LoginUserResponseDto
- tsconfig.build.json
- CreateDocumentDto
- SearchTeacherGradeDto
- test.entity.ts
- src_repositories_section_dto_index_sectionteachergradedto
- UpdateSettingDto
- teacher-degree.service.ts
- TeacherDegreeService
- openapi.js
- TeacherService
- CLAUDE.md
- document.service.ts
- Career
- ResponseTeacherDto
- GetTeachersDto
- Revisión de cambios — sigeit-api
- TeacherDegree
- CreateDepartmentDto
- DepartmentSetting
- Inscription
- UpdateDepartmentSettingDto
- src_repositories_document_document_service_periodservice
- property-diff.util.ts
- rxjs
- QueryBaseDto

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 103 edges
2. `@nestjs/common` - 88 edges
3. `class-validator` - 51 edges
4. `Department` - 49 edges
5. `typeorm` - 46 edges
6. `Section` - 46 edges
7. `class-transformer` - 44 edges
8. `@nestjs/typeorm` - 43 edges
9. `IdEntity` - 41 edges
10. `Subject` - 41 edges

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

## Communities (101 total, 6 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.08
Nodes (37): ApiConflictResponse, ApiOkResponse, DownloadPlannedSchedulesDto, ApiProperty, IsNumber, IsOptional, GetSchedulesDto, ApiPropertyOptional (+29 more)

### Community 2 - "Classroom"
Cohesion: 0.06
Nodes (44): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+36 more)

### Community 3 - "teacher.service.ts"
Cohesion: 0.26
Nodes (7): src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_responsesubjecthistorydto, src_repositories_teacher_dto_index_updateteacherdto, ResponseSubjectHistoryDto, ApiProperty, UpdateTeacherDto

### Community 4 - "DocumentController"
Cohesion: 0.14
Nodes (14): DocumentController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, Body (+6 more)

### Community 5 - "@nestjs/testing"
Cohesion: 0.06
Nodes (35): @nestjs/testing, CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+27 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (28): src_common_use_case_index_crudrepository, DayController, ApiResponse, ApiTags, Body, Controller, Get, Param (+20 more)

### Community 7 - "CareerController"
Cohesion: 0.13
Nodes (15): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+7 more)

### Community 8 - "period.service.ts"
Cohesion: 0.05
Nodes (42): IsDate, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty (+34 more)

### Community 9 - "schedule-planning.service.ts"
Cohesion: 0.11
Nodes (31): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto, src_repositories_schedule_dto_index_periodauditdto, src_repositories_schedule_dto_index_planningperiodquerydto, src_repositories_schedule_dto_index_scheduleconflictsdto (+23 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (44): author, description, engines, node, license, name, private, version (+36 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.10
Nodes (13): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity (+5 more)

### Community 12 - "Section"
Cohesion: 0.14
Nodes (18): Day, Column, Entity, src_repositories_day_entities_index_day, src_repositories_period_entities_index_period, Period, Column, Entity (+10 more)

### Community 13 - "user.service.ts"
Cohesion: 0.11
Nodes (24): src_auth_password_hasher_index_hashpassword, TeacherModule, Module, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail (+16 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.13
Nodes (19): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+11 more)

### Community 15 - "SubjectDemand"
Cohesion: 0.18
Nodes (10): SubjectDemand, Column, Entity, JoinColumn, ManyToOne, DemandRow, SubjectDemandService, Injectable (+2 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.16
Nodes (13): exceljs, ref_stream, stripAccents(), detectDelimiter(), isInteger(), locateColumns(), normalizeHeader(), ParsedDemand (+5 more)

### Community 17 - "section.service.ts"
Cohesion: 0.11
Nodes (22): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+14 more)

### Community 18 - "SectionController"
Cohesion: 0.15
Nodes (16): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiOperation, ApiResponse (+8 more)

### Community 19 - "section-teacher.service.ts"
Cohesion: 0.09
Nodes (29): src_repositories_section_dto_index_getsectionteachersdto, src_repositories_section_dto_index_responsesectionteacherdto, GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type (+21 more)

### Community 20 - "@nestjs/common"
Cohesion: 0.11
Nodes (24): @nestjs/common, @nestjs/typeorm, CareerModule, Module, ClassroomModule, Module, DayModule, Module (+16 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "TestService"
Cohesion: 0.13
Nodes (13): CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param, Patch (+5 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "DocumentService"
Cohesion: 0.17
Nodes (11): DocumentService, Injectable, InjectRepository, ResponseDocumentDto, ApiProperty, ApiPropertyOptional, DocumentE, Column (+3 more)

### Community 25 - "Teacher"
Cohesion: 0.11
Nodes (29): Teacher, Column, Entity, JoinColumn, ManyToOne, src_repositories_teacher_enum_index_employmentstatus, src_repositories_teacher_enum_index_hiringevaluationstatus, src_repositories_teacher_enum_index_teacher_category_level (+21 more)

### Community 26 - "Schedule"
Cohesion: 0.10
Nodes (18): InjectRepository, ResponseScheduleDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+10 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.18
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "app.module.ts"
Cohesion: 0.17
Nodes (10): @nestjs/config, AppController, Controller, Get, AppService, Injectable, AuthModule, Module (+2 more)

### Community 29 - "auth.controller.ts"
Cohesion: 0.07
Nodes (26): ref_express, ref_express_serve_static_core, Inject, ChangePasswordService, Inject, Injectable, ChangePasswordDto, ChangePasswordResponseDto (+18 more)

### Community 30 - "schedule.controller.ts"
Cohesion: 0.13
Nodes (19): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+11 more)

### Community 31 - "audit.module.ts"
Cohesion: 0.15
Nodes (9): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, Injectable, AuditModule, Module (+1 more)

### Community 32 - "Setting"
Cohesion: 0.15
Nodes (11): ResponseSettingDto, ApiProperty, ApiPropertyOptional, Setting, Column, Entity, SettingService, Injectable (+3 more)

### Community 33 - "Subject"
Cohesion: 0.05
Nodes (45): CrudRepository, CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type (+37 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.21
Nodes (13): Put, Req, AuthController, ApiResponse, ApiTags, Body, Controller, Get (+5 more)

### Community 36 - "department-setting.service.ts"
Cohesion: 0.21
Nodes (12): src_common_text_index_stripaccents, ResponseOfficeNumbersDto, src_repositories_setting_dto_index_reserveofficenumbersdto, src_repositories_setting_dto_index_responsedepartmentsettingdto, src_repositories_setting_dto_index_responseofficenumbersdto, src_repositories_setting_dto_index_responsesettingdto, src_repositories_setting_dto_index_updatedepartmentsettingdto, src_repositories_setting_dto_index_updatesettingdto (+4 more)

### Community 37 - "InscriptionService"
Cohesion: 0.12
Nodes (14): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, ResponseSectionDto (+6 more)

### Community 38 - "response-teacher-degree.dto.ts"
Cohesion: 0.18
Nodes (18): normalizeText(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey(), summarizeGrades(), ResponseTeacherGradeDto (+10 more)

### Community 39 - "SectionService"
Cohesion: 0.25
Nodes (3): SectionService, Injectable, InjectRepository

### Community 40 - "TeacherDegreeController"
Cohesion: 0.15
Nodes (16): UpdateTeacherDegreeDto, TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body (+8 more)

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
Cohesion: 0.15
Nodes (18): AuditRequestShape, RequestUser, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource() (+10 more)

### Community 45 - "UserService"
Cohesion: 0.10
Nodes (19): ApiHideProperty, Exclude, hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "UserController"
Cohesion: 0.20
Nodes (9): ApiResponse, ApiTags, Body, Controller, Get, Param, Patch, Post (+1 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.16
Nodes (7): @nestjs/passport, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "DepartmentService"
Cohesion: 0.08
Nodes (26): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+18 more)

### Community 52 - "schedule-planning-response.dto.ts"
Cohesion: 0.19
Nodes (16): AuditSummaryDto, ConflictPairDto, CoverageStatus, Complete, Empty, Exceeded, Incomplete, DayConflictsDto (+8 more)

### Community 53 - "pagination.ts"
Cohesion: 0.36
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - "GetAuditLogsDto"
Cohesion: 0.12
Nodes (16): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+8 more)

### Community 55 - "TeacherController"
Cohesion: 0.18
Nodes (10): TeacherController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+2 more)

### Community 56 - "AuditService"
Cohesion: 0.24
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "subject-demand.service.ts"
Cohesion: 0.16
Nodes (13): src_common_upload_index_uploadedfiledata, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto, ApiProperty, src_repositories_subject_demand_dto_index_getsubjectdemanddto (+5 more)

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "Delete"
Cohesion: 0.13
Nodes (16): Delete, CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse (+8 more)

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.16
Nodes (21): IsPositive, CreateTeacherDegreeDto, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean (+13 more)

### Community 62 - "TypeDocument"
Cohesion: 0.24
Nodes (10): ActiveDocumentQueryDto, FindDocumentsQueryDto, ApiProperty, ApiPropertyOptional, IsEnum, IsInt, IsOptional, Type (+2 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.module.ts"
Cohesion: 0.06
Nodes (30): bcrypt, ref_jsonwebtoken, @nestjs/jwt, passport-jwt, passport-local, src_auth_change_password_dto_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice, JWT_CONST (+22 more)

### Community 65 - "DepartmentSettingService"
Cohesion: 0.29
Nodes (7): currentYear(), DepartmentSettingService, toPrefix(), Injectable, ResponseDepartmentSettingDto, ApiProperty, assertCanManageDepartment()

### Community 66 - "recovery-password.service.ts"
Cohesion: 0.24
Nodes (7): RecoveryPasswordDto, RecoveryPasswordResponseDto, ApiProperty, IsNotEmpty, IsString, RecoveryPasswordService, Injectable

### Community 67 - "CreateTeacherDto"
Cohesion: 0.18
Nodes (11): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+3 more)

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - ".reserveOfficeNumbers"
Cohesion: 0.22
Nodes (14): SettingController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, Body (+6 more)

### Community 70 - "Department"
Cohesion: 0.12
Nodes (20): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, src_repositories_department_dto_index_createdepartmentdto, src_repositories_department_dto_index_getdepartmentsdto (+12 more)

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.16
Nodes (21): pdf-parse, src_repositories_teacher_dto_index_teacherdegreeperioddto, src_repositories_teacher_dto_index_teachergradedto, src_repositories_teacher_dto_index_transcriptpreviewdto, buildRequest(), callModel(), failure(), FALLBACK_STATUS (+13 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.22
Nodes (5): ScheduleConflictService, Injectable, SchedulePlanningService, Injectable, ConflictContext

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "LoginUserResponseDto"
Cohesion: 0.32
Nodes (8): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "CreateDocumentDto"
Cohesion: 0.18
Nodes (11): CreateDocumentDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString (+3 more)

### Community 77 - "SearchTeacherGradeDto"
Cohesion: 0.18
Nodes (11): ResponseTeacherGradeSearchDto, SearchTeacherGradeDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString (+3 more)

### Community 81 - "UpdateSettingDto"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min (+1 more)

### Community 82 - "teacher-degree.service.ts"
Cohesion: 0.13
Nodes (18): @nestjs/platform-express, src_common_text_index_normalizetext, src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, src_repositories_teacher_dto_index_createteacherdegreedto (+10 more)

### Community 83 - "TeacherDegreeService"
Cohesion: 0.35
Nodes (6): pickDegreeFields(), ResponseTeacherDegreeDto, assertInScale(), TeacherDegreeService, toGradeEntity(), Injectable

### Community 84 - "openapi.js"
Cohesion: 0.12
Nodes (12): download(), execute(), fs, https, ref_child_process, cookie-parser, ref_fs, ref_https (+4 more)

### Community 85 - "TeacherService"
Cohesion: 0.31
Nodes (3): TeacherService, Injectable, InjectRepository

### Community 87 - "document.service.ts"
Cohesion: 0.14
Nodes (14): src_common_validation_index_strictvalidation, strictValidation, DocumentModule, Module, src_repositories_document_dto_index_activedocumentquerydto, src_repositories_document_dto_index_createdocumentdto, src_repositories_document_dto_index_finddocumentsquerydto, src_repositories_document_dto_index_responsedocumentdto (+6 more)

### Community 88 - "Career"
Cohesion: 0.08
Nodes (31): CareerService, Injectable, InjectRepository, CreateCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty (+23 more)

### Community 89 - "ResponseTeacherDto"
Cohesion: 0.20
Nodes (9): ResponseTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 90 - "GetTeachersDto"
Cohesion: 0.25
Nodes (7): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, Query

### Community 91 - "Revisión de cambios — sigeit-api"
Cohesion: 0.29
Nodes (6): 1. Seguridad, 2. Eficiencia, 3. Duplicado y muerto, 4. Idioma y documentación, 5. Verificación, Revisión de cambios — sigeit-api

### Community 92 - "TeacherDegree"
Cohesion: 0.25
Nodes (7): OneToMany, TeacherDegree, Column, Entity, JoinColumn, ManyToOne, InjectRepository

### Community 93 - "CreateDepartmentDto"
Cohesion: 0.25
Nodes (8): CreateDepartmentDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 94 - "DepartmentSetting"
Cohesion: 0.29
Nodes (6): OneToOne, InjectRepository, DepartmentSetting, Column, Entity, JoinColumn

### Community 95 - "Inscription"
Cohesion: 0.20
Nodes (8): Inscription, Column, Entity, Index, JoinColumn, ManyToOne, Inject, InjectRepository

### Community 96 - "UpdateDepartmentSettingDto"
Cohesion: 0.33
Nodes (9): ReserveOfficeNumbersDto, ApiPropertyOptional, IsBoolean, IsInt, IsOptional, Matches, Max, Min (+1 more)

### Community 98 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 100 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

## Knowledge Gaps
- **264 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+259 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 902 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `teacher.service.ts`, `@nestjs/testing`, `day.service.ts`, `period.service.ts`, `schedule-planning.service.ts`, `package.json`, `Section`, `user.service.ts`, `inscription.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `section-teacher.service.ts`, `TestService`, `audit.service.ts`, `app.module.ts`, `auth.controller.ts`, `schedule.controller.ts`, `audit.module.ts`, `Subject`, `department-setting.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `login.guard.ts`, `subject-demand.service.ts`, `auth.module.ts`, `recovery-password.service.ts`, `Department`, `transcript-ai.reader.ts`, `teacher-degree.service.ts`, `openapi.js`, `document.service.ts`, `Career`?**
  _High betweenness centrality (0.296) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `Classroom`, `teacher.service.ts`, `@nestjs/testing`, `period.service.ts`, `package.json`, `Section`, `user.service.ts`, `inscription.service.ts`, `section.service.ts`, `@nestjs/common`, `TestService`, `Teacher`, `audit.service.ts`, `auth.controller.ts`, `schedule.controller.ts`, `Subject`, `department-setting.service.ts`, `response-teacher-degree.dto.ts`, `schedule-planning-response.dto.ts`, `subject-demand.service.ts`, `CreateTeacherDegreeDto`, `recovery-password.service.ts`, `Department`, `teacher-degree.service.ts`, `openapi.js`, `document.service.ts`, `Career`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/common` to `statistics.service.ts`, `Classroom`, `teacher.service.ts`, `@nestjs/testing`, `day.service.ts`, `period.service.ts`, `schedule-planning.service.ts`, `package.json`, `Section`, `user.service.ts`, `inscription.service.ts`, `section.service.ts`, `section-teacher.service.ts`, `audit.service.ts`, `app.module.ts`, `schedule.controller.ts`, `audit.module.ts`, `Subject`, `department-setting.service.ts`, `subject-demand.service.ts`, `Department`, `teacher-degree.service.ts`, `document.service.ts`, `Career`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _264 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleController` be split into smaller, more focused modules?**
  _Cohesion score 0.08326530612244898 - nodes in this community are weakly interconnected._
- **Should `Classroom` be split into smaller, more focused modules?**
  _Cohesion score 0.05755693581780538 - nodes in this community are weakly interconnected._