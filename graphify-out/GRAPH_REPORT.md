# Graph Report - sigeit-api  (2026-10-18)

## Corpus Check
- 354 files · ~79,783 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2282 nodes · 5880 edges · 106 communities (98 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b900e9da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- classroom.service.ts
- School
- document.service.ts
- SchoolService
- day.service.ts
- CareerController
- PeriodController
- schedule-time.util.ts
- package.json
- @nestjs/swagger
- CoverageStatus
- user.service.ts
- response-inscription.dto.ts
- PeriodService
- subject-demand.parser.ts
- section.service.ts
- SectionController
- Section
- repositories.module.ts
- dependencies
- Delete
- devDependencies
- SectionTeacherService
- Teacher
- Schedule
- audit.service.ts
- app.module.ts
- change-password.service.ts
- login.service.ts
- audit.module.ts
- Setting
- subject.service.ts
- scripts
- Public
- @nestjs/common
- InscriptionService
- response-teacher-degree.dto.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- ResponseTeacherDto
- audit-capture.service.ts
- UserService
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- login.guard.ts
- AuditAction
- department.service.ts
- schedule-planning.service.ts
- pagination.ts
- .findByEntity
- teacher.service.ts
- AuditService
- subject-demand.service.ts
- Contrato de estadísticas para frontend con Chart.js
- InscriptionController
- jest
- CreateTeacherDegreeDto
- period.service.ts
- README.md
- auth.controller.ts
- DepartmentSetting
- recovery-password.service.ts
- GetAuditLogsDto
- nest-cli.json
- SettingController
- typeorm
- transcript-ai.reader.ts
- ScheduleConflictService
- openapitools.json
- Department
- tsconfig.build.json
- User
- SearchTeacherGradeDto
- test.entity.ts
- src_repositories_section_dto_index_sectionteachergradedto
- UpdateSettingDto
- property-diff.util.ts
- teacher-degree.service.ts
- openapi.js
- section-teacher.service.ts
- CLAUDE.md
- DocumentE
- career.service.ts
- inscription.service.ts
- CreateScheduleDto
- ResponsePeriodDto
- CareerService
- CreatePeriodDto
- ResponseCareerDto
- Inscription
- ReserveOfficeNumbersDto
- @nestjs/testing
- GetCareersDto
- CreateCareerDto
- CreateSectionDto
- ResponseSectionDto
- CloseInscriptionDto
- GetSchedulesDto
- rxjs
- stripAccents

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 103 edges
2. `@nestjs/common` - 87 edges
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
- `LoginUserResponseDto` --references--> `School`  [EXTRACTED]
  src/auth/login/dto/login.dto.ts → src/repositories/school/entities/school.entity.ts

## Import Cycles
- 4-file cycle: `src/auth/jwt-auth/JwtAuth.guard.ts -> src/auth/login/index.ts -> src/auth/login/login.service.ts -> src/auth/jwt-auth/index.ts -> src/auth/jwt-auth/JwtAuth.guard.ts`
- 4-file cycle: `src/repositories/career/entities/career.entity.ts -> src/repositories/subject/entities/index.ts -> src/repositories/subject/entities/subject.entity.ts -> src/repositories/career/entities/index.ts -> src/repositories/career/entities/career.entity.ts`
- 4-file cycle: `src/repositories/classroom/entities/classroom.entity.ts -> src/repositories/department/entities/index.ts -> src/repositories/department/entities/department.entity.ts -> src/repositories/classroom/entities/index.ts -> src/repositories/classroom/entities/classroom.entity.ts`

## Communities (106 total, 8 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.15
Nodes (18): ApiConflictResponse, ApiOkResponse, DownloadPlannedSchedulesDto, ApiProperty, IsNumber, IsOptional, ScheduleController, ApiOperation (+10 more)

### Community 2 - "classroom.service.ts"
Cohesion: 0.06
Nodes (40): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+32 more)

### Community 3 - "School"
Cohesion: 0.20
Nodes (12): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, UpdateSchoolDto (+4 more)

### Community 4 - "document.service.ts"
Cohesion: 0.06
Nodes (49): src_common_use_case_index_crudrepository, DocumentController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags (+41 more)

### Community 5 - "SchoolService"
Cohesion: 0.09
Nodes (20): ResponseSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+12 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (31): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+23 more)

### Community 7 - "CareerController"
Cohesion: 0.21
Nodes (9): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+1 more)

### Community 8 - "PeriodController"
Cohesion: 0.15
Nodes (10): PeriodController, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get, Param (+2 more)

### Community 9 - "schedule-time.util.ts"
Cohesion: 0.21
Nodes (16): toCoverage(), academicHours(), consecutiveBlocks(), findOverlaps(), isValidRange(), isWithinPeriod(), overlaps(), peakLevel() (+8 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (45): author, description, engines, node, license, name, private, version (+37 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.15
Nodes (11): class-transformer, class-validator, @nestjs/swagger, QueryBaseDto, ApiPropertyOptional, Type, IdCreateEntity, ApiProperty (+3 more)

### Community 12 - "CoverageStatus"
Cohesion: 0.40
Nodes (5): CoverageStatus, Complete, Empty, Exceeded, Incomplete

### Community 13 - "user.service.ts"
Cohesion: 0.14
Nodes (14): src_auth_password_hasher_index_hashpassword, CrudRepository, src_repositories_user_dto_index_userrespondedto, UpdateUserDto, src_repositories_user_entities_index_user, src_repositories_user_enums_index_roles, Roles, Administrator (+6 more)

### Community 14 - "response-inscription.dto.ts"
Cohesion: 0.15
Nodes (14): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+6 more)

### Community 15 - "PeriodService"
Cohesion: 0.27
Nodes (3): PeriodService, Injectable, InjectRepository

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.20
Nodes (12): exceljs, ref_stream, src_common_text_index_stripaccents, detectDelimiter(), isInteger(), locateColumns(), normalizeHeader(), ParsedDemand (+4 more)

### Community 17 - "section.service.ts"
Cohesion: 0.20
Nodes (10): src_repositories_section_dto_index_createsectiondto, src_repositories_section_dto_index_generatereportdto, src_repositories_section_dto_index_getsectionsdto, src_repositories_section_dto_index_reportresponsedto, src_repositories_section_dto_index_responsesectiondto, src_repositories_section_dto_index_updatesectiondto, ReportResponseDto, ApiProperty (+2 more)

### Community 18 - "SectionController"
Cohesion: 0.11
Nodes (21): GenerateReportDto, ApiProperty, IsNumber, IsOptional, IsString, GetSectionsDto, ApiPropertyOptional, IsBooleanString (+13 more)

### Community 19 - "Section"
Cohesion: 0.07
Nodes (41): OneToMany, src_repositories_period_entities_index_period, Period, Column, Entity, InjectRepository, Section, Column (+33 more)

### Community 20 - "repositories.module.ts"
Cohesion: 0.07
Nodes (26): DayModule, Module, DocumentModule, Module, InscriptionModule, Module, PeriodModule, Module (+18 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.12
Nodes (14): Delete, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 25 - "Teacher"
Cohesion: 0.10
Nodes (30): Teacher, Column, Entity, JoinColumn, ManyToOne, src_repositories_teacher_enum_index_employmentstatus, src_repositories_teacher_enum_index_hiringevaluationstatus, src_repositories_teacher_enum_index_teacher_category_level (+22 more)

### Community 26 - "Schedule"
Cohesion: 0.10
Nodes (17): ResponseScheduleDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, Schedule (+9 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.20
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "app.module.ts"
Cohesion: 0.14
Nodes (12): @nestjs/config, AppController, Controller, Get, AppService, Injectable, AuditModule, Module (+4 more)

### Community 29 - "change-password.service.ts"
Cohesion: 0.15
Nodes (11): Inject, ChangePasswordService, Inject, Injectable, ChangePasswordDto, ChangePasswordResponseDto, ApiProperty, IsNotEmpty (+3 more)

### Community 30 - "login.service.ts"
Cohesion: 0.08
Nodes (20): bcrypt, ref_express, ref_express_serve_static_core, @nestjs/passport, passport-local, getDefaultCokieOptions(), src_auth_cookies_index_getdefaultcokieoptions, src_auth_jwt_auth_index_jwt_const (+12 more)

### Community 31 - "audit.module.ts"
Cohesion: 0.18
Nodes (7): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable

### Community 32 - "Setting"
Cohesion: 0.18
Nodes (9): ResponseSettingDto, ApiProperty, ApiPropertyOptional, Setting, Column, Entity, SettingService, Injectable (+1 more)

### Community 33 - "subject.service.ts"
Cohesion: 0.06
Nodes (38): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+30 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.21
Nodes (13): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Param (+5 more)

### Community 36 - "@nestjs/common"
Cohesion: 0.25
Nodes (11): @nestjs/common, ResponseOfficeNumbersDto, src_repositories_setting_dto_index_reserveofficenumbersdto, src_repositories_setting_dto_index_responsedepartmentsettingdto, src_repositories_setting_dto_index_responseofficenumbersdto, src_repositories_setting_dto_index_responsesettingdto, src_repositories_setting_dto_index_updatedepartmentsettingdto, src_repositories_setting_dto_index_updatesettingdto (+3 more)

### Community 37 - "InscriptionService"
Cohesion: 0.22
Nodes (7): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable

### Community 38 - "response-teacher-degree.dto.ts"
Cohesion: 0.17
Nodes (19): src_common_text_index_normalizetext, normalizeText(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey(), summarizeGrades() (+11 more)

### Community 39 - "SectionService"
Cohesion: 0.16
Nodes (4): InjectRepository, SectionService, Injectable, InjectRepository

### Community 40 - "TeacherDegreeController"
Cohesion: 0.16
Nodes (15): TeacherDegreeController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Body, Controller (+7 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+11 more)

### Community 42 - "Generación de Clientes API - SIGEIT-API"
Cohesion: 0.11
Nodes (18): Angular, Archivo de Configuración OpenAPI, Configuración, Copia de Clientes (Post-construcción), Dependencias Requeridas, Error de Generación de Clientes, Error de Generación de Swagger, Estructura de Archivos Generados (+10 more)

### Community 43 - "ResponseTeacherDto"
Cohesion: 0.10
Nodes (25): GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type, SubjectRefDto, ResponseTeacherDto (+17 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "UserService"
Cohesion: 0.07
Nodes (28): CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+20 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.21
Nodes (7): @nestjs-modules/mailer, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.20
Nodes (15): FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean, IsInt (+7 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.16
Nodes (6): JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable

### Community 50 - "AuditAction"
Cohesion: 0.12
Nodes (14): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+6 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (41): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+33 more)

### Community 52 - "schedule-planning.service.ts"
Cohesion: 0.11
Nodes (34): @nestjs/typeorm, src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_createschedulesbulkdto, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_downloadplannedschedulesdto, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto (+26 more)

### Community 53 - "pagination.ts"
Cohesion: 0.36
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "teacher.service.ts"
Cohesion: 0.06
Nodes (37): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+29 more)

### Community 56 - "AuditService"
Cohesion: 0.21
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "subject-demand.service.ts"
Cohesion: 0.13
Nodes (18): FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto (+10 more)

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "InscriptionController"
Cohesion: 0.19
Nodes (10): InscriptionController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+2 more)

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.18
Nodes (19): IsPositive, CreateTeacherDegreeDto, DEGREE_FIELDS, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray (+11 more)

### Community 62 - "period.service.ts"
Cohesion: 0.19
Nodes (11): src_repositories_period_dto_index_createperioddto, src_repositories_period_dto_index_responseperioddto, src_repositories_period_dto_index_updateperioddto, UpdatePeriodDto, src_repositories_period_enum_index_stageperiod, StagePeriod, finalized, Planned (+3 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.controller.ts"
Cohesion: 0.08
Nodes (23): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice, JWT_CONST, src_auth_jwt_auth_index_jwtauthguard (+15 more)

### Community 65 - "DepartmentSetting"
Cohesion: 0.19
Nodes (11): OneToOne, currentYear(), DepartmentSettingService, Injectable, InjectRepository, ResponseDepartmentSettingDto, ApiProperty, DepartmentSetting (+3 more)

### Community 66 - "recovery-password.service.ts"
Cohesion: 0.13
Nodes (12): JwtAuthService, Injectable, JwtResult, Inject, RecoveryPasswordDto, RecoveryPasswordResponseDto, ApiProperty, IsNotEmpty (+4 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "SettingController"
Cohesion: 0.22
Nodes (13): SettingController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, Body (+5 more)

### Community 70 - "typeorm"
Cohesion: 0.19
Nodes (13): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, Classroom, Column (+5 more)

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.15
Nodes (23): pdf-parse, src_repositories_teacher_dto_index_teacherdegreeperioddto, src_repositories_teacher_dto_index_teachergradedto, TranscriptPreviewDto, ApiProperty, ApiPropertyOptional, buildRequest(), callModel() (+15 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.19
Nodes (6): ScheduleConflictService, Injectable, SchedulePlanningService, Injectable, InjectRepository, ConflictContext

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "Department"
Cohesion: 0.14
Nodes (22): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type (+14 more)

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "User"
Cohesion: 0.20
Nodes (9): ApiHideProperty, Exclude, Column, Entity, Index, JoinColumn, ManyToOne, User (+1 more)

### Community 77 - "SearchTeacherGradeDto"
Cohesion: 0.22
Nodes (9): SearchTeacherGradeDto, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min (+1 more)

### Community 81 - "UpdateSettingDto"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min (+1 more)

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 83 - "teacher-degree.service.ts"
Cohesion: 0.13
Nodes (20): src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, pickDegreeFields(), src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_pickdegreefields, src_repositories_teacher_dto_index_responseteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdto (+12 more)

### Community 84 - "openapi.js"
Cohesion: 0.12
Nodes (12): download(), execute(), fs, https, ref_child_process, cookie-parser, ref_fs, ref_https (+4 more)

### Community 85 - "section-teacher.service.ts"
Cohesion: 0.18
Nodes (15): src_repositories_section_dto_index_getsectionteachersdto, src_repositories_section_dto_index_responsesectionteacherdto, best(), bestGrades(), byRelevance(), GENERIC_WORDS, keyWords(), subjectFit() (+7 more)

### Community 87 - "DocumentE"
Cohesion: 0.23
Nodes (8): DocumentE, Column, Entity, JoinColumn, ManyToOne, src_repositories_document_enum_index_typedocument, TypeDocument, AcademicCharge

### Community 88 - "career.service.ts"
Cohesion: 0.28
Nodes (6): CareerModule, Module, src_repositories_career_dto_index_createcareerdto, src_repositories_career_dto_index_getcareersdto, src_repositories_career_dto_index_updatecareerdto, UpdateCareerDto

### Community 89 - "inscription.service.ts"
Cohesion: 0.32
Nodes (7): src_repositories_inscription_dto_index_closeinscriptiondto, src_repositories_inscription_dto_index_createinscriptiondto, src_repositories_inscription_dto_index_getinscriptiondto, src_repositories_inscription_dto_index_responseinscriptiondto, src_repositories_inscription_dto_index_updateinscriptiondto, UpdateInscriptionDto, src_repositories_inscription_entities_index_inscription

### Community 90 - "CreateScheduleDto"
Cohesion: 0.17
Nodes (12): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+4 more)

### Community 91 - "ResponsePeriodDto"
Cohesion: 0.20
Nodes (9): IsDate, ResponsePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+1 more)

### Community 92 - "CareerService"
Cohesion: 0.33
Nodes (3): CareerService, Injectable, InjectRepository

### Community 93 - "CreatePeriodDto"
Cohesion: 0.20
Nodes (10): CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional (+2 more)

### Community 94 - "ResponseCareerDto"
Cohesion: 0.22
Nodes (8): ResponseCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 95 - "Inscription"
Cohesion: 0.22
Nodes (8): Inscription, Column, Entity, Index, JoinColumn, ManyToOne, Inject, InjectRepository

### Community 96 - "ReserveOfficeNumbersDto"
Cohesion: 0.31
Nodes (9): ReserveOfficeNumbersDto, ApiPropertyOptional, IsBoolean, IsInt, IsOptional, Matches, Max, Min (+1 more)

### Community 98 - "GetCareersDto"
Cohesion: 0.29
Nodes (6): Query, GetCareersDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

### Community 99 - "CreateCareerDto"
Cohesion: 0.25
Nodes (8): CreateCareerDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 100 - "CreateSectionDto"
Cohesion: 0.25
Nodes (8): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 101 - "ResponseSectionDto"
Cohesion: 0.25
Nodes (7): ResponseSectionDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type

### Community 102 - "CloseInscriptionDto"
Cohesion: 0.40
Nodes (5): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type

### Community 103 - "GetSchedulesDto"
Cohesion: 0.40
Nodes (5): GetSchedulesDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type

## Knowledge Gaps
- **259 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+254 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 899 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `classroom.service.ts`, `School`, `document.service.ts`, `day.service.ts`, `package.json`, `user.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `Section`, `repositories.module.ts`, `Delete`, `audit.service.ts`, `app.module.ts`, `change-password.service.ts`, `login.service.ts`, `audit.module.ts`, `subject.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `login.guard.ts`, `department.service.ts`, `schedule-planning.service.ts`, `teacher.service.ts`, `subject-demand.service.ts`, `period.service.ts`, `auth.controller.ts`, `recovery-password.service.ts`, `transcript-ai.reader.ts`, `teacher-degree.service.ts`, `openapi.js`, `section-teacher.service.ts`, `career.service.ts`, `inscription.service.ts`?**
  _High betweenness centrality (0.302) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `classroom.service.ts`, `School`, `document.service.ts`, `day.service.ts`, `package.json`, `user.service.ts`, `response-inscription.dto.ts`, `section.service.ts`, `Section`, `Delete`, `Teacher`, `audit.service.ts`, `subject.service.ts`, `@nestjs/common`, `response-teacher-degree.dto.ts`, `ResponseTeacherDto`, `ScheduleConflictsQueryDto`, `department.service.ts`, `schedule-planning.service.ts`, `teacher.service.ts`, `subject-demand.service.ts`, `CreateTeacherDegreeDto`, `period.service.ts`, `auth.controller.ts`, `recovery-password.service.ts`, `Department`, `teacher-degree.service.ts`, `openapi.js`, `DocumentE`, `career.service.ts`, `inscription.service.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `schedule-planning.service.ts` to `statistics.service.ts`, `classroom.service.ts`, `School`, `document.service.ts`, `day.service.ts`, `package.json`, `user.service.ts`, `section.service.ts`, `Section`, `audit.service.ts`, `app.module.ts`, `audit.module.ts`, `subject.service.ts`, `@nestjs/common`, `department.service.ts`, `teacher.service.ts`, `subject-demand.service.ts`, `period.service.ts`, `teacher-degree.service.ts`, `section-teacher.service.ts`, `career.service.ts`, `inscription.service.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _259 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055593685655456415 - nodes in this community are weakly interconnected._
- **Should `classroom.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05817028027498678 - nodes in this community are weakly interconnected._
- **Should `document.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05664568678267309 - nodes in this community are weakly interconnected._