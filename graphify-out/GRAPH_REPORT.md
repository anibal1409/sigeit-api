# Graph Report - sigeit-api  (2026-10-18)

## Corpus Check
- 344 files · ~79,273 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2232 nodes · 5792 edges · 100 communities (87 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 172 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c2e3d423`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- CrudRepository
- change-password.service.ts
- .update
- School
- day.service.ts
- login.service.ts
- period.service.ts
- schedule-planning.service.ts
- package.json
- @nestjs/swagger
- SectionTeacherService
- @nestjs/common
- src_repositories_inscription_dto_index_closeinscriptiondto
- SubjectDemand
- subject-demand.parser.ts
- section-teacher.service.ts
- SectionService
- Section
- repositories.module.ts
- dependencies
- Delete
- devDependencies
- DocumentService
- response-teacher.dto.ts
- ScheduleService
- audit.service.ts
- app.module.ts
- auth.controller.ts
- schedule.controller.ts
- RecoveryPasswordResponseDto
- Setting
- SubjectService
- scripts
- Public
- setting.controller.ts
- TypeDocument
- response-teacher-degree.dto.ts
- UpdateDepartmentSettingDto
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- create-teacher-degree.dto.ts
- audit.module.ts
- User
- mail.service.ts
- .import
- CreateUserDto
- login.guard.ts
- subject.service.ts
- department.service.ts
- CoverageStatus
- pagination.ts
- AuditController
- AllowRoles
- AuditService
- subject-demand.service.ts
- Contrato de estadísticas para frontend con Chart.js
- SearchTeacherGradeDto
- jest
- DepartmentSetting
- FindDocumentsQueryDto
- README.md
- auth.module.ts
- DepartmentSettingService
- ScheduleConflictsQueryDto
- property-diff.util.ts
- nest-cli.json
- .reserveOfficeNumbers
- typeorm
- CreateTeacherDegreeDto
- ScheduleConflictService
- openapitools.json
- Department
- tsconfig.build.json
- CreateDocumentDto
- GetAuditLogsDto
- test.entity.ts
- src_repositories_section_dto_index_sectionteachergradedto
- UpdateSettingDto
- teacher-degree.service.ts
- src_repositories_inscription_dto_index_createinscriptiondto
- @nestjs/core
- src_repositories_inscription_dto_index_getinscriptiondto
- CLAUDE.md
- document.service.ts
- career.service.ts
- src_repositories_inscription_dto_index_responseinscriptiondto
- src_repositories_inscription_dto_index_updateinscriptiondto
- Revisión de cambios — sigeit-api
- Subject
- src_repositories_inscription_entities_index_inscription
- src_repositories_inscription_enums_index_stageinscription
- openapi.js
- src_repositories_document_document_service_periodservice
- audit-capture.service.ts
- rxjs
- RolesGuard

## God Nodes (most connected - your core abstractions)
1. `@nestjs/swagger` - 97 edges
2. `@nestjs/common` - 87 edges
3. `User` - 55 edges
4. `Department` - 49 edges
5. `class-validator` - 47 edges
6. `typeorm` - 45 edges
7. `Section` - 43 edges
8. `@nestjs/typeorm` - 42 edges
9. `Subject` - 41 edges
10. `class-transformer` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Error de Generación de Swagger` --references--> `AppModule`  [INFERRED]
  README-CLIENTS.md → src/app.module.ts
- `1. Seguridad` --references--> `assertDepartmentScope()`  [INFERRED]
  .cursor/skills/sigeit-review/SKILL.md → src/repositories/user/permissions.ts
- `AuditController` --references--> `AllowRoles()`  [EXTRACTED]
  src/audit/audit.controller.ts → src/auth/roles/roles.decorator.ts
- `CreateAuditEntryParams` --references--> `AuditAction`  [EXTRACTED]
  src/audit/audit.service.ts → src/audit/enum/audit-action.enum.ts
- `AuditLog` --references--> `AuditAction`  [EXTRACTED]
  src/audit/entities/audit-log.entity.ts → src/audit/enum/audit-action.enum.ts

## Import Cycles
- 4-file cycle: `src/auth/jwt-auth/JwtAuth.guard.ts -> src/auth/login/index.ts -> src/auth/login/login.service.ts -> src/auth/jwt-auth/index.ts -> src/auth/jwt-auth/JwtAuth.guard.ts`
- 4-file cycle: `src/repositories/career/entities/career.entity.ts -> src/repositories/subject/entities/index.ts -> src/repositories/subject/entities/subject.entity.ts -> src/repositories/career/entities/index.ts -> src/repositories/career/entities/career.entity.ts`
- 4-file cycle: `src/repositories/classroom/entities/classroom.entity.ts -> src/repositories/department/entities/index.ts -> src/repositories/department/entities/department.entity.ts -> src/repositories/classroom/entities/index.ts -> src/repositories/classroom/entities/classroom.entity.ts`

## Communities (100 total, 13 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.14
Nodes (19): ApiConflictResponse, ApiOkResponse, GetSchedulesDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, ScheduleController (+11 more)

### Community 2 - "CrudRepository"
Cohesion: 0.06
Nodes (42): CrudRepository, ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param (+34 more)

### Community 3 - "change-password.service.ts"
Cohesion: 0.15
Nodes (11): Inject, ChangePasswordService, Inject, Injectable, ChangePasswordDto, ChangePasswordResponseDto, ApiProperty, IsNotEmpty (+3 more)

### Community 4 - ".update"
Cohesion: 0.19
Nodes (14): DocumentController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, Body (+6 more)

### Community 5 - "School"
Cohesion: 0.07
Nodes (34): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, ResponseSchoolDto (+26 more)

### Community 6 - "day.service.ts"
Cohesion: 0.07
Nodes (33): DayController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+25 more)

### Community 7 - "login.service.ts"
Cohesion: 0.09
Nodes (19): bcrypt, ref_express, ref_express_serve_static_core, passport-local, getDefaultCokieOptions(), src_auth_cookies_index_getdefaultcokieoptions, src_auth_jwt_auth_index_jwt_const, src_auth_login_dto_index_loginuserresponsedto (+11 more)

### Community 8 - "period.service.ts"
Cohesion: 0.05
Nodes (43): IsDate, CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty (+35 more)

### Community 9 - "schedule-planning.service.ts"
Cohesion: 0.09
Nodes (42): src_repositories_period_entities_index_period, Period, Column, Entity, src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_freeslotdto (+34 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (45): author, description, engines, node, license, name, private, version (+37 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.13
Nodes (11): class-transformer, class-validator, @nestjs/swagger, QueryBaseDto, ApiPropertyOptional, Type, IdCreateEntity, ApiProperty (+3 more)

### Community 12 - "SectionTeacherService"
Cohesion: 0.19
Nodes (8): GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type, SectionTeacherService, Injectable

### Community 13 - "@nestjs/common"
Cohesion: 0.14
Nodes (20): @nestjs/common, src_audit_dto_index_auditlogspagedto, src_auth_password_hasher_index_hashpassword, src_auth_roles_index_allowroles, ANY_ROLE, ROLES_KEY, READ_METHODS, RequestWithUser (+12 more)

### Community 15 - "SubjectDemand"
Cohesion: 0.14
Nodes (12): ResponseSubjectDemandDto, ApiProperty, SubjectDemand, Column, Entity, JoinColumn, ManyToOne, DemandRow (+4 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.18
Nodes (14): exceljs, ref_stream, src_common_text_index_stripaccents, stripAccents(), toPrefix(), detectDelimiter(), isInteger(), locateColumns() (+6 more)

### Community 17 - "section-teacher.service.ts"
Cohesion: 0.18
Nodes (15): src_common_text_index_normalizetext, src_repositories_section_dto_index_getsectionteachersdto, src_repositories_section_dto_index_responsesectionteacherdto, best(), bestGrades(), byRelevance(), GENERIC_WORDS, keyWords() (+7 more)

### Community 18 - "SectionService"
Cohesion: 0.05
Nodes (40): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+32 more)

### Community 19 - "Section"
Cohesion: 0.09
Nodes (30): @nestjs/typeorm, src_auth_roles_index_planning_roles, PLANNING_ROLES, src_common_use_case_index_crudrepository, src_repositories_section_dto_index_createsectiondto, src_repositories_section_dto_index_generatereportdto, src_repositories_section_dto_index_getsectionsdto, src_repositories_section_dto_index_reportresponsedto (+22 more)

### Community 20 - "repositories.module.ts"
Cohesion: 0.13
Nodes (18): CareerModule, Module, DocumentModule, Module, PeriodModule, Module, ScheduleModule, Module (+10 more)

### Community 21 - "dependencies"
Cohesion: 0.06
Nodes (32): dependencies, bcrypt, class-transformer, class-validator, cookie-parser, ejs, exceljs, handlebars (+24 more)

### Community 22 - "Delete"
Cohesion: 0.12
Nodes (14): Delete, CreateTestDto, UpdateTestDto, TestController, Body, Controller, Get, Param (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, eslint-plugin-prettier, jest, @nestjs/cli, @nestjs/schematics, @nestjs/testing (+19 more)

### Community 24 - "DocumentService"
Cohesion: 0.16
Nodes (12): DocumentService, Injectable, InjectRepository, ResponseDocumentDto, ApiProperty, ApiPropertyOptional, DocumentE, Column (+4 more)

### Community 25 - "response-teacher.dto.ts"
Cohesion: 0.08
Nodes (35): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+27 more)

### Community 26 - "ScheduleService"
Cohesion: 0.16
Nodes (11): ResponseScheduleDto, ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString, Type, ScheduleService (+3 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.09
Nodes (25): CreateAuditEntryParams, AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+17 more)

### Community 28 - "app.module.ts"
Cohesion: 0.15
Nodes (12): @nestjs/config, AppController, Controller, Get, AppService, Injectable, AuditModule, Module (+4 more)

### Community 29 - "auth.controller.ts"
Cohesion: 0.09
Nodes (23): src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice, LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber (+15 more)

### Community 30 - "schedule.controller.ts"
Cohesion: 0.11
Nodes (24): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+16 more)

### Community 31 - "RecoveryPasswordResponseDto"
Cohesion: 0.24
Nodes (7): RecoveryPasswordDto, RecoveryPasswordResponseDto, ApiProperty, IsNotEmpty, IsString, RecoveryPasswordService, Injectable

### Community 32 - "Setting"
Cohesion: 0.20
Nodes (9): ResponseSettingDto, ApiProperty, ApiPropertyOptional, Setting, Column, Entity, SettingService, Injectable (+1 more)

### Community 33 - "SubjectService"
Cohesion: 0.06
Nodes (33): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+25 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "Public"
Cohesion: 0.21
Nodes (13): Put, Req, AuthController, ApiResponse, ApiTags, Body, Controller, Get (+5 more)

### Community 36 - "setting.controller.ts"
Cohesion: 0.21
Nodes (12): src_common_validation_index_strictvalidation, ResponseOfficeNumbersDto, src_repositories_setting_dto_index_reserveofficenumbersdto, src_repositories_setting_dto_index_responsedepartmentsettingdto, src_repositories_setting_dto_index_responseofficenumbersdto, src_repositories_setting_dto_index_responsesettingdto, src_repositories_setting_dto_index_updatedepartmentsettingdto, src_repositories_setting_dto_index_updatesettingdto (+4 more)

### Community 37 - "TypeDocument"
Cohesion: 0.32
Nodes (4): src_repositories_base_index_idcreateentity, src_repositories_document_enum_index_typedocument, TypeDocument, AcademicCharge

### Community 38 - "response-teacher-degree.dto.ts"
Cohesion: 0.16
Nodes (18): normalizeText(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey(), summarizeGrades(), ResponseTeacherGradeDto (+10 more)

### Community 39 - "UpdateDepartmentSettingDto"
Cohesion: 0.29
Nodes (10): ReserveOfficeNumbersDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsInt, IsOptional, Matches, Max (+2 more)

### Community 40 - "TeacherDegreeController"
Cohesion: 0.17
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

### Community 44 - "audit.module.ts"
Cohesion: 0.18
Nodes (7): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable

### Community 45 - "User"
Cohesion: 0.11
Nodes (19): ApiHideProperty, Exclude, hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.18
Nodes (8): @nestjs-modules/mailer, Inject, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "CreateUserDto"
Cohesion: 0.11
Nodes (19): CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 49 - "login.guard.ts"
Cohesion: 0.16
Nodes (7): @nestjs/passport, JwtAuthGuard, Injectable, src_auth_login_index_is_public_key, IS_PUBLIC_KEY, LoginAuthGuard, Injectable

### Community 50 - "subject.service.ts"
Cohesion: 0.31
Nodes (4): src_repositories_subject_dto_index_createsubjectdto, src_repositories_subject_dto_index_getsubjectdepartmentdto, src_repositories_subject_dto_index_updatesubjectdto, normalizeSubjectCode()

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (41): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+33 more)

### Community 52 - "CoverageStatus"
Cohesion: 0.40
Nodes (5): CoverageStatus, Complete, Empty, Exceeded, Incomplete

### Community 53 - "pagination.ts"
Cohesion: 0.36
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - "AuditController"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "AllowRoles"
Cohesion: 0.07
Nodes (34): src_auth_roles_index_teacher_admin_roles, AllowRoles(), TEACHER_ADMIN_ROLES, GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional (+26 more)

### Community 56 - "AuditService"
Cohesion: 0.24
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "subject-demand.service.ts"
Cohesion: 0.17
Nodes (13): FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ImportSubjectDemandResultDto (+5 more)

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "SearchTeacherGradeDto"
Cohesion: 0.20
Nodes (10): SearchTeacherGradeDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber, IsOptional, IsString, Max (+2 more)

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "DepartmentSetting"
Cohesion: 0.25
Nodes (6): OneToOne, InjectRepository, DepartmentSetting, Column, Entity, JoinColumn

### Community 62 - "FindDocumentsQueryDto"
Cohesion: 0.32
Nodes (8): ActiveDocumentQueryDto, FindDocumentsQueryDto, ApiProperty, ApiPropertyOptional, IsEnum, IsInt, IsOptional, Type

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.module.ts"
Cohesion: 0.12
Nodes (14): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, JWT_CONST, src_auth_jwt_auth_index_jwtauthguard, JwtAuthService, Injectable, JwtResult (+6 more)

### Community 65 - "DepartmentSettingService"
Cohesion: 0.47
Nodes (4): currentYear(), DepartmentSettingService, Injectable, ResponseDepartmentSettingDto

### Community 66 - "ScheduleConflictsQueryDto"
Cohesion: 0.20
Nodes (15): FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean, IsInt (+7 more)

### Community 67 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - ".reserveOfficeNumbers"
Cohesion: 0.21
Nodes (13): SettingController, ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, Body (+5 more)

### Community 70 - "typeorm"
Cohesion: 0.20
Nodes (12): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_base_index_identity, Classroom, Column (+4 more)

### Community 71 - "CreateTeacherDegreeDto"
Cohesion: 0.10
Nodes (37): IsPositive, pdf-parse, CreateTeacherDegreeDto, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray (+29 more)

### Community 72 - "ScheduleConflictService"
Cohesion: 0.13
Nodes (17): AuditSummaryDto, ConflictPairDto, DayConflictsDto, FreeClassroomDto, FreeSlotDto, PeriodAuditDto, ScheduleConflictsDto, ScheduleLiteDto (+9 more)

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "Department"
Cohesion: 0.19
Nodes (14): Career, Column, Entity, JoinColumn, ManyToMany, ManyToOne, src_repositories_career_entities_index_career, Department (+6 more)

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "CreateDocumentDto"
Cohesion: 0.18
Nodes (11): CreateDocumentDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString (+3 more)

### Community 77 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 81 - "UpdateSettingDto"
Cohesion: 0.22
Nodes (9): ApiPropertyOptional, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min (+1 more)

### Community 82 - "teacher-degree.service.ts"
Cohesion: 0.10
Nodes (25): src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, src_common_upload_index_uploadedfiledata, pickDegreeFields(), src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_pickdegreefields, src_repositories_teacher_dto_index_responseteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdto (+17 more)

### Community 84 - "@nestjs/core"
Cohesion: 0.20
Nodes (6): cookie-parser, ref_fs, @nestjs/core, supertest, AppModule, Module

### Community 87 - "document.service.ts"
Cohesion: 0.15
Nodes (9): @nestjs/testing, strictValidation, src_repositories_document_dto_index_activedocumentquerydto, src_repositories_document_dto_index_createdocumentdto, src_repositories_document_dto_index_finddocumentsquerydto, src_repositories_document_dto_index_responsedocumentdto, src_repositories_document_dto_index_updatedocumentdto, UpdateDocumentDto (+1 more)

### Community 88 - "career.service.ts"
Cohesion: 0.06
Nodes (38): CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+30 more)

### Community 91 - "Revisión de cambios — sigeit-api"
Cohesion: 0.29
Nodes (6): 1. Seguridad, 2. Eficiencia, 3. Duplicado y muerto, 4. Idioma y documentación, 5. Verificación, Revisión de cambios — sigeit-api

### Community 92 - "Subject"
Cohesion: 0.10
Nodes (22): OneToMany, InjectRepository, Subject, Column, Entity, JoinColumn, JoinTable, ManyToMany (+14 more)

### Community 95 - "openapi.js"
Cohesion: 0.33
Nodes (6): download(), execute(), fs, https, ref_child_process, ref_https

### Community 98 - "audit-capture.service.ts"
Cohesion: 0.16
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 101 - "RolesGuard"
Cohesion: 0.40
Nodes (3): RolesGuard, Injectable, InjectRepository

## Knowledge Gaps
- **262 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+257 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 881 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `CrudRepository`, `change-password.service.ts`, `School`, `day.service.ts`, `login.service.ts`, `period.service.ts`, `schedule-planning.service.ts`, `package.json`, `@nestjs/swagger`, `subject-demand.parser.ts`, `section-teacher.service.ts`, `Section`, `repositories.module.ts`, `Delete`, `audit.service.ts`, `app.module.ts`, `auth.controller.ts`, `schedule.controller.ts`, `setting.controller.ts`, `audit.module.ts`, `mail.service.ts`, `login.guard.ts`, `subject.service.ts`, `department.service.ts`, `AllowRoles`, `subject-demand.service.ts`, `auth.module.ts`, `CreateTeacherDegreeDto`, `Department`, `teacher-degree.service.ts`, `@nestjs/core`, `document.service.ts`, `career.service.ts`, `audit-capture.service.ts`?**
  _High betweenness centrality (0.252) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `CrudRepository`, `change-password.service.ts`, `School`, `day.service.ts`, `period.service.ts`, `schedule-planning.service.ts`, `package.json`, `@nestjs/common`, `Section`, `Delete`, `response-teacher.dto.ts`, `audit.service.ts`, `auth.controller.ts`, `schedule.controller.ts`, `RecoveryPasswordResponseDto`, `setting.controller.ts`, `TypeDocument`, `response-teacher-degree.dto.ts`, `create-teacher-degree.dto.ts`, `department.service.ts`, `AllowRoles`, `subject-demand.service.ts`, `ScheduleConflictsQueryDto`, `ScheduleConflictService`, `Department`, `teacher-degree.service.ts`, `@nestjs/core`, `document.service.ts`, `career.service.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `User` connect `User` to `ScheduleController`, `DepartmentSettingService`, `.update`, `RolesGuard`, `setting.controller.ts`, `.reserveOfficeNumbers`, `typeorm`, `School`, `Department`, `@nestjs/common`, `CreateUserDto`, `Section`, `document.service.ts`, `DocumentService`, `ScheduleService`, `schedule.controller.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _262 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleController` be split into smaller, more focused modules?**
  _Cohesion score 0.14015151515151514 - nodes in this community are weakly interconnected._
- **Should `CrudRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.05507246376811594 - nodes in this community are weakly interconnected._