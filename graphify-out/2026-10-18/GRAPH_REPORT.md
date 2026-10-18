# Graph Report - sigeit-api  (2026-10-18)

## Corpus Check
- 357 files · ~80,563 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2293 nodes · 5906 edges · 103 communities (95 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec509747`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- CrudRepository
- Teacher
- DocumentController
- School
- day.service.ts
- CareerController
- period.service.ts
- schedule-conflict.service.ts
- package.json
- @nestjs/swagger
- Section
- user.service.ts
- inscription.service.ts
- SubjectDemand
- subject-demand.parser.ts
- section.service.ts
- SectionController
- teacher-degree.service.ts
- @nestjs/common
- dependencies
- Delete
- devDependencies
- DocumentService
- ResponseTeacherDto
- schedule.service.ts
- audit.service.ts
- app.module.ts
- auth.controller.ts
- .constructor
- audit-path.util.ts
- Setting
- SubjectService
- subject.service.ts
- Public
- department-setting.service.ts
- InscriptionService
- response-teacher-degree.dto.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- create-teacher-degree.dto.ts
- audit-capture.service.ts
- UserService
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- login.guard.ts
- AuditAction
- department.service.ts
- schedule-planning.service.ts
- common/index.ts
- .findByEntity
- TeacherService
- AuditService
- subject-demand.service.ts
- Contrato de estadísticas para frontend con Chart.js
- InscriptionController
- jest
- CreateTeacherDegreeDto
- TypeDocument
- README.md
- auth.module.ts
- DepartmentSetting
- RecoveryPasswordResponseDto
- GetAuditLogsDto
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
- teacher-degree.controller.ts
- TeacherDegreeService
- openapi.js
- GetInscriptionDto
- CLAUDE.md
- document.service.ts
- career.service.ts
- AppModule
- GetSubjectDemandDto
- Revisión de cambios — sigeit-api
- CareerService
- .getHello
- ResponseCareerDto
- Inscription
- UpdateDepartmentSettingDto
- @nestjs/testing
- GetCareersDto
- CreateCareerDto
- AuditModule
- ResponseSectionDto
- AuthModule

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 103 edges
2. `@nestjs/common` - 88 edges
3. `class-validator` - 51 edges
4. `Department` - 48 edges
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

## Communities (103 total, 8 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.14
Nodes (19): ApiConflictResponse, ApiOkResponse, GetSchedulesDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, ScheduleController (+11 more)

### Community 2 - "CrudRepository"
Cohesion: 0.05
Nodes (47): CrudRepository, ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param (+39 more)

### Community 3 - "Teacher"
Cohesion: 0.11
Nodes (19): OneToMany, src_repositories_section_entities_index_section, src_repositories_teacher_dto_index_createteacherdto, src_repositories_teacher_dto_index_getteachersdto, src_repositories_teacher_dto_index_responsesubjecthistorydto, src_repositories_teacher_dto_index_updateteacherdto, ResponseSubjectHistoryDto, ApiProperty (+11 more)

### Community 4 - "DocumentController"
Cohesion: 0.23
Nodes (11): DocumentController, ApiBadRequestResponse, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, Body, Controller (+3 more)

### Community 5 - "School"
Cohesion: 0.07
Nodes (34): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, ResponseSchoolDto (+26 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (33): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+25 more)

### Community 7 - "CareerController"
Cohesion: 0.21
Nodes (9): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 8 - "period.service.ts"
Cohesion: 0.06
Nodes (41): IsDate, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty (+33 more)

### Community 9 - "schedule-conflict.service.ts"
Cohesion: 0.15
Nodes (23): src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_scheduleconflictsdto, src_repositories_schedule_dto_index_scheduleconflictsquerydto, src_repositories_schedule_dto_index_schedulelitedto, ScheduleCandidate, toCoverage(), academicHours(), consecutiveBlocks() (+15 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (48): author, description, engines, node, license, name, private, version (+40 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.12
Nodes (12): class-transformer, class-validator, @nestjs/swagger, QueryBaseDto, ApiPropertyOptional, Type, IdCreateEntity, ApiProperty (+4 more)

### Community 12 - "Section"
Cohesion: 0.11
Nodes (19): src_repositories_period_entities_index_period, Period, Column, Entity, InjectRepository, src_repositories_schedule_entities_index_schedule, Schedule, Column (+11 more)

### Community 13 - "user.service.ts"
Cohesion: 0.12
Nodes (22): src_auth_password_hasher_index_hashpassword, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional (+14 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.12
Nodes (22): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, src_repositories_inscription_dto_index_closeinscriptiondto, src_repositories_inscription_dto_index_createinscriptiondto, src_repositories_inscription_dto_index_getinscriptiondto (+14 more)

### Community 15 - "SubjectDemand"
Cohesion: 0.15
Nodes (12): ImportSubjectDemandResultDto, ApiProperty, SubjectDemand, Column, Entity, JoinColumn, ManyToOne, DemandRow (+4 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.18
Nodes (13): exceljs, ref_stream, src_common_text_index_stripaccents, detectDelimiter(), isInteger(), locateColumns(), normalizeHeader(), ParsedDemand (+5 more)

### Community 17 - "section.service.ts"
Cohesion: 0.09
Nodes (25): src_common_use_case_index_crudrepository, CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+17 more)

### Community 18 - "SectionController"
Cohesion: 0.16
Nodes (16): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiOperation, ApiResponse (+8 more)

### Community 19 - "teacher-degree.service.ts"
Cohesion: 0.07
Nodes (42): @nestjs/typeorm, src_common_text_index_normalizetext, best(), bestGrades(), byRelevance(), GENERIC_WORDS, keyWords(), SectionTeacherService (+34 more)

### Community 20 - "@nestjs/common"
Cohesion: 0.13
Nodes (16): @nestjs/common, strictValidation, PeriodModule, Module, SettingModule, Module, StatisticsModule, Module (+8 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.12
Nodes (14): Delete, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.04
Nodes (48): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+40 more)

### Community 24 - "DocumentService"
Cohesion: 0.18
Nodes (11): DocumentService, Injectable, InjectRepository, ResponseDocumentDto, ApiProperty, ApiPropertyOptional, DocumentE, Column (+3 more)

### Community 25 - "ResponseTeacherDto"
Cohesion: 0.06
Nodes (44): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+36 more)

### Community 26 - "schedule.service.ts"
Cohesion: 0.06
Nodes (34): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+26 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.17
Nodes (13): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+5 more)

### Community 28 - "app.module.ts"
Cohesion: 0.25
Nodes (7): @nestjs/config, AppController, Controller, AppService, Injectable, RepositoriesModule, Module

### Community 29 - "auth.controller.ts"
Cohesion: 0.10
Nodes (19): ChangePasswordDto, ChangePasswordResponseDto, ApiProperty, IsNotEmpty, IsString, src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice (+11 more)

### Community 30 - ".constructor"
Cohesion: 0.14
Nodes (9): ref_express_serve_static_core, Inject, ChangePasswordService, Inject, Injectable, getDefaultCokieOptions(), src_auth_cookies_index_getdefaultcokieoptions, LogoutService (+1 more)

### Community 31 - "audit-path.util.ts"
Cohesion: 0.13
Nodes (15): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, EXCLUDED_PREFIXES (+7 more)

### Community 32 - "Setting"
Cohesion: 0.20
Nodes (9): ResponseSettingDto, ApiProperty, ApiPropertyOptional, Setting, Column, Entity, SettingService, Injectable (+1 more)

### Community 33 - "SubjectService"
Cohesion: 0.07
Nodes (26): GetSubjectDepartmentDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, ResponseSubjectDto, ApiProperty, ApiPropertyOptional (+18 more)

### Community 34 - "subject.service.ts"
Cohesion: 0.19
Nodes (11): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, src_repositories_subject_dto_index_createsubjectdto (+3 more)

### Community 35 - "Public"
Cohesion: 0.21
Nodes (13): Put, Req, AuthController, ApiResponse, ApiTags, Body, Controller, Get (+5 more)

### Community 36 - "department-setting.service.ts"
Cohesion: 0.19
Nodes (15): stripAccents(), toPrefix(), ResponseOfficeNumbersDto, src_repositories_setting_dto_index_reserveofficenumbersdto, src_repositories_setting_dto_index_responsedepartmentsettingdto, src_repositories_setting_dto_index_responseofficenumbersdto, src_repositories_setting_dto_index_responsesettingdto, src_repositories_setting_dto_index_updatedepartmentsettingdto (+7 more)

### Community 37 - "InscriptionService"
Cohesion: 0.22
Nodes (7): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable

### Community 38 - "response-teacher-degree.dto.ts"
Cohesion: 0.16
Nodes (18): normalizeText(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey(), summarizeGrades(), ResponseTeacherGradeDto (+10 more)

### Community 39 - "SectionService"
Cohesion: 0.20
Nodes (3): SectionService, Injectable, InjectRepository

### Community 40 - "TeacherDegreeController"
Cohesion: 0.15
Nodes (16): UpdateTeacherDegreeDto, TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body (+8 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.13
Nodes (14): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Estructura de Archivos Generados, Flujo de Trabajo Recomendado, Generación Completa de Clientes (+6 more)

### Community 43 - "create-teacher-degree.dto.ts"
Cohesion: 0.14
Nodes (16): GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type, DEGREE_FIELDS, SubjectRefDto (+8 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (14): AuditRequestShape, maskSensitivePath(), parseResourceFromPath(), extractAuthAuditUser(), buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit() (+6 more)

### Community 45 - "UserService"
Cohesion: 0.11
Nodes (18): ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, UserRespondeDto, ApiResponse (+10 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, MailModule, Module, MailService, Injectable, recovery(), welcome(), InjectRepository

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.24
Nodes (14): FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean, IsInt (+6 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.12
Nodes (9): @nestjs/passport, rxjs, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable (+1 more)

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (41): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+33 more)

### Community 52 - "schedule-planning.service.ts"
Cohesion: 0.13
Nodes (25): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto, src_repositories_schedule_dto_index_periodauditdto, src_repositories_schedule_dto_index_planningperiodquerydto, src_repositories_schedule_dto_index_sectioncoveragedto, AuditSummaryDto (+17 more)

### Community 53 - "common/index.ts"
Cohesion: 0.31
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "TeacherService"
Cohesion: 0.09
Nodes (21): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, UpdateTeacherDto, TeacherController (+13 more)

### Community 56 - "AuditService"
Cohesion: 0.24
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "subject-demand.service.ts"
Cohesion: 0.29
Nodes (4): src_repositories_subject_demand_dto_index_getsubjectdemanddto, src_repositories_subject_demand_dto_index_importsubjectdemandresultdto, src_repositories_subject_demand_dto_index_responsesubjectdemanddto, src_repositories_subject_demand_entities_index_subjectdemand

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "InscriptionController"
Cohesion: 0.14
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.21
Nodes (18): IsPositive, CreateTeacherDegreeDto, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray, IsBoolean (+10 more)

### Community 62 - "TypeDocument"
Cohesion: 0.17
Nodes (13): ApiNotFoundResponse, Get, Query, ActiveDocumentQueryDto, FindDocumentsQueryDto, ApiProperty, ApiPropertyOptional, IsEnum (+5 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.module.ts"
Cohesion: 0.08
Nodes (23): ref_express, ref_jsonwebtoken, @nestjs/jwt, src_auth_change_password_dto_index_changepasswordresponsedto, JWT_CONST, src_auth_jwt_auth_index_jwt_const, src_auth_jwt_auth_index_jwtauthguard, src_auth_jwt_auth_index_jwtauthservice (+15 more)

### Community 65 - "DepartmentSetting"
Cohesion: 0.20
Nodes (10): OneToOne, currentYear(), DepartmentSettingService, Injectable, InjectRepository, ResponseDepartmentSettingDto, DepartmentSetting, Column (+2 more)

### Community 66 - "RecoveryPasswordResponseDto"
Cohesion: 0.12
Nodes (12): bcrypt, UserLoginDto, comparePassword(), hashPassword(), RecoveryPasswordDto, RecoveryPasswordResponseDto, ApiProperty, IsNotEmpty (+4 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - ".reserveOfficeNumbers"
Cohesion: 0.21
Nodes (13): SettingController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, Body (+5 more)

### Community 70 - "Department"
Cohesion: 0.11
Nodes (28): ApiHideProperty, CreateDateColumn, Exclude, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity (+20 more)

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.14
Nodes (24): pdf-parse, src_repositories_teacher_dto_index_teacherdegreeperioddto, src_repositories_teacher_dto_index_teachergradedto, src_repositories_teacher_dto_index_transcriptpreviewdto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, buildRequest() (+16 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.19
Nodes (6): ScheduleConflictService, Injectable, SchedulePlanningService, Injectable, InjectRepository, ConflictContext

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
Cohesion: 0.17
Nodes (11): CreateDocumentDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString (+3 more)

### Community 77 - "SearchTeacherGradeDto"
Cohesion: 0.18
Nodes (11): ResponseTeacherGradeSearchDto, SearchTeacherGradeDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString (+3 more)

### Community 81 - "UpdateSettingDto"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min (+1 more)

### Community 82 - "teacher-degree.controller.ts"
Cohesion: 0.36
Nodes (7): @nestjs/platform-express, src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData

### Community 83 - "TeacherDegreeService"
Cohesion: 0.35
Nodes (6): pickDegreeFields(), ResponseTeacherDegreeDto, assertInScale(), TeacherDegreeService, toGradeEntity(), Injectable

### Community 84 - "openapi.js"
Cohesion: 0.29
Nodes (7): download(), execute(), fs, https, ref_child_process, ref_fs, ref_https

### Community 85 - "GetInscriptionDto"
Cohesion: 0.20
Nodes (5): GetInscriptionDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

### Community 87 - "document.service.ts"
Cohesion: 0.19
Nodes (11): src_common_validation_index_strictvalidation, DocumentModule, Module, src_repositories_document_dto_index_activedocumentquerydto, src_repositories_document_dto_index_createdocumentdto, src_repositories_document_dto_index_finddocumentsquerydto, src_repositories_document_dto_index_responsedocumentdto, src_repositories_document_dto_index_updatedocumentdto (+3 more)

### Community 88 - "career.service.ts"
Cohesion: 0.28
Nodes (6): CareerModule, Module, src_repositories_career_dto_index_createcareerdto, src_repositories_career_dto_index_getcareersdto, src_repositories_career_dto_index_updatecareerdto, UpdateCareerDto

### Community 89 - "AppModule"
Cohesion: 0.25
Nodes (7): Error de Generación de Clientes, Error de Generación de Swagger, Problemas de Compatibilidad, Solución de Problemas, supertest, AppModule, Module

### Community 90 - "GetSubjectDemandDto"
Cohesion: 0.25
Nodes (6): GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ResponseSubjectDemandDto, ApiProperty

### Community 91 - "Revisión de cambios — sigeit-api"
Cohesion: 0.29
Nodes (6): 1. Seguridad, 2. Eficiencia, 3. Duplicado y muerto, 4. Idioma y documentación, 5. Verificación, Revisión de cambios — sigeit-api

### Community 92 - "CareerService"
Cohesion: 0.33
Nodes (3): CareerService, Injectable, InjectRepository

### Community 94 - "ResponseCareerDto"
Cohesion: 0.22
Nodes (8): ResponseCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 95 - "Inscription"
Cohesion: 0.22
Nodes (8): Inscription, Column, Entity, Index, JoinColumn, ManyToOne, Inject, InjectRepository

### Community 96 - "UpdateDepartmentSettingDto"
Cohesion: 0.29
Nodes (10): ReserveOfficeNumbersDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsInt, IsOptional, Matches, Max (+2 more)

### Community 98 - "GetCareersDto"
Cohesion: 0.29
Nodes (6): Query, GetCareersDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

### Community 99 - "CreateCareerDto"
Cohesion: 0.25
Nodes (8): CreateCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 101 - "ResponseSectionDto"
Cohesion: 0.25
Nodes (7): ResponseSectionDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

## Knowledge Gaps
- **264 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+259 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 902 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `CrudRepository`, `Teacher`, `School`, `day.service.ts`, `period.service.ts`, `schedule-conflict.service.ts`, `package.json`, `Section`, `user.service.ts`, `inscription.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `teacher-degree.service.ts`, `Delete`, `schedule.service.ts`, `audit.service.ts`, `app.module.ts`, `auth.controller.ts`, `.constructor`, `audit-path.util.ts`, `subject.service.ts`, `department-setting.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `login.guard.ts`, `department.service.ts`, `schedule-planning.service.ts`, `subject-demand.service.ts`, `auth.module.ts`, `transcript-ai.reader.ts`, `teacher-degree.controller.ts`, `document.service.ts`, `career.service.ts`, `AppModule`?**
  _High betweenness centrality (0.299) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `CrudRepository`, `Teacher`, `School`, `day.service.ts`, `period.service.ts`, `package.json`, `Section`, `user.service.ts`, `inscription.service.ts`, `section.service.ts`, `Delete`, `ResponseTeacherDto`, `audit.service.ts`, `auth.controller.ts`, `subject.service.ts`, `department-setting.service.ts`, `response-teacher-degree.dto.ts`, `create-teacher-degree.dto.ts`, `department.service.ts`, `schedule-planning.service.ts`, `subject-demand.service.ts`, `TypeDocument`, `RecoveryPasswordResponseDto`, `Department`, `CreateDocumentDto`, `teacher-degree.controller.ts`, `document.service.ts`, `career.service.ts`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `teacher-degree.service.ts` to `statistics.service.ts`, `CrudRepository`, `Teacher`, `School`, `day.service.ts`, `period.service.ts`, `schedule-conflict.service.ts`, `package.json`, `Section`, `user.service.ts`, `inscription.service.ts`, `section.service.ts`, `@nestjs/common`, `schedule.service.ts`, `audit.service.ts`, `app.module.ts`, `subject.service.ts`, `department-setting.service.ts`, `department.service.ts`, `schedule-planning.service.ts`, `subject-demand.service.ts`, `document.service.ts`, `career.service.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _264 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleController` be split into smaller, more focused modules?**
  _Cohesion score 0.1431451612903226 - nodes in this community are weakly interconnected._
- **Should `CrudRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.05157894736842105 - nodes in this community are weakly interconnected._