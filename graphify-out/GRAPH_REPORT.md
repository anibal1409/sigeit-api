# Graph Report - sigeit-api  (2026-09-30)

## Corpus Check
- 339 files · ~76,276 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .mdc 1, .example 1)

## Summary
- 2162 nodes · 5523 edges · 84 communities (78 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 180 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a7b17e1a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- statistics.service.ts
- ScheduleController
- classroom.service.ts
- teacher.service.ts
- document.service.ts
- SchoolService
- day.service.ts
- CrudRepository
- PeriodService
- schedule-time.util.ts
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
- Delete
- devDependencies
- section-teacher.service.ts
- Teacher
- Schedule
- audit.service.ts
- @nestjs/testing
- recovery-password.service.ts
- login.service.ts
- audit.module.ts
- InscriptionController
- subject.service.ts
- scripts
- AuthController
- UserService
- InscriptionService
- response-teacher-degree.dto.ts
- SectionService
- TeacherDegreeController
- compilerOptions
- Generación de Clientes API - SIGEIT-API
- search-teacher-grade.dto.ts
- audit-capture.service.ts
- Department
- mail.service.ts
- .import
- ScheduleConflictsQueryDto
- JwtAuthGuard
- AuditAction
- department.service.ts
- UserController
- common/index.ts
- .findByEntity
- Section
- AuditService
- teacher-degree.service.ts
- Contrato de estadísticas para frontend con Chart.js
- Inscription
- jest
- CreateTeacherDegreeDto
- period.service.ts
- README.md
- auth.controller.ts
- SubjectDemand
- School
- GetAuditLogsDto
- nest-cli.json
- openapi.js
- create-document.dto.ts
- transcript-ai.reader.ts
- Classroom
- openapitools.json
- LoginUserResponseDto
- tsconfig.build.json
- GetSubjectDemandDto
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

## Communities (84 total, 6 thin omitted)

### Community 0 - "statistics.service.ts"
Cohesion: 0.06
Nodes (55): ArrayMinSize, src_repositories_statistics_dto_index_careersectionstatitemdto, src_repositories_statistics_dto_index_classroomusageitemdto, src_repositories_statistics_dto_index_curriculumsemesterstatitemdto, src_repositories_statistics_dto_index_departmentstatitemdto, src_repositories_statistics_dto_index_periodandoptionalclassroomquerydto, src_repositories_statistics_dto_index_periodcomparisondeltadto, src_repositories_statistics_dto_index_periodcomparisonquerydto (+47 more)

### Community 1 - "ScheduleController"
Cohesion: 0.13
Nodes (19): ApiConflictResponse, ApiOkResponse, GetSchedulesDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, ScheduleController (+11 more)

### Community 2 - "classroom.service.ts"
Cohesion: 0.06
Nodes (40): ClassroomController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+32 more)

### Community 3 - "teacher.service.ts"
Cohesion: 0.07
Nodes (31): CreateTeacherDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty (+23 more)

### Community 4 - "document.service.ts"
Cohesion: 0.07
Nodes (34): DocumentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+26 more)

### Community 5 - "SchoolService"
Cohesion: 0.09
Nodes (20): ResponseSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+12 more)

### Community 6 - "day.service.ts"
Cohesion: 0.08
Nodes (28): Public(), src_common_use_case_index_crudrepository, DayController, ApiResponse, ApiTags, Body, Controller, Get (+20 more)

### Community 7 - "CrudRepository"
Cohesion: 0.06
Nodes (38): CrudRepository, CareerController, ApiResponse, ApiTags, Body, Controller, Get, Param (+30 more)

### Community 8 - "PeriodService"
Cohesion: 0.08
Nodes (22): IsDate, ResponsePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString (+14 more)

### Community 9 - "schedule-time.util.ts"
Cohesion: 0.17
Nodes (17): toCoverage(), academicHours(), consecutiveBlocks(), findOverlaps(), isValidRange(), isWithinPeriod(), overlaps(), peakLevel() (+9 more)

### Community 10 - "package.json"
Cohesion: 0.04
Nodes (45): author, description, license, name, private, version, cookie-parser, ejs (+37 more)

### Community 11 - "@nestjs/swagger"
Cohesion: 0.12
Nodes (10): class-transformer, class-validator, @nestjs/swagger, IdCreateEntity, ApiProperty, IsNotEmpty, IsNumber, src_repositories_base_index_idcreateentity (+2 more)

### Community 12 - "schedule-planning.service.ts"
Cohesion: 0.10
Nodes (32): src_repositories_schedule_dto_index_conflictpairdto, src_repositories_schedule_dto_index_coveragestatus, src_repositories_schedule_dto_index_dayconflictsdto, src_repositories_schedule_dto_index_freeslotdto, src_repositories_schedule_dto_index_freeslotsquerydto, src_repositories_schedule_dto_index_periodauditdto, src_repositories_schedule_dto_index_planningperiodquerydto, src_repositories_schedule_dto_index_scheduleconflictsdto (+24 more)

### Community 13 - "user.service.ts"
Cohesion: 0.11
Nodes (24): src_auth_password_hasher_index_hashpassword, TeacherModule, Module, CreateUserDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsEmail (+16 more)

### Community 14 - "inscription.service.ts"
Cohesion: 0.12
Nodes (19): CreateInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, GetInscriptionDto, ApiPropertyOptional, IsBooleanString (+11 more)

### Community 15 - "subject-demand.service.ts"
Cohesion: 0.20
Nodes (10): src_common_upload_index_uploadedfiledata, FILE_UPLOAD_BODY, MAX_UPLOAD_SIZE, UploadedFileData, ImportSubjectDemandResultDto, ApiProperty, src_repositories_subject_demand_dto_index_getsubjectdemanddto, src_repositories_subject_demand_dto_index_importsubjectdemandresultdto (+2 more)

### Community 16 - "subject-demand.parser.ts"
Cohesion: 0.20
Nodes (12): exceljs, ref_stream, src_common_text_index_stripaccents, detectDelimiter(), isInteger(), locateColumns(), normalizeHeader(), ParsedDemand (+4 more)

### Community 17 - "section.service.ts"
Cohesion: 0.10
Nodes (24): CreateSectionDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, Type (+16 more)

### Community 18 - "SectionController"
Cohesion: 0.14
Nodes (16): GetSectionsDto, ApiPropertyOptional, IsBooleanString, IsOptional, Type, SectionController, ApiOperation, ApiResponse (+8 more)

### Community 19 - "Subject"
Cohesion: 0.11
Nodes (23): OneToMany, InjectRepository, src_repositories_subject_entities_index_subject, Subject, Column, Entity, JoinColumn, JoinTable (+15 more)

### Community 20 - "@nestjs/common"
Cohesion: 0.14
Nodes (20): @nestjs/common, @nestjs/typeorm, CareerModule, Module, DayModule, Module, DocumentModule, Module (+12 more)

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
Cohesion: 0.12
Nodes (21): src_common_text_index_normalizetext, GetSectionTeachersDto, ResponseSectionTeacherDto, ApiProperty, ApiPropertyOptional, IsOptional, Type, best() (+13 more)

### Community 25 - "Teacher"
Cohesion: 0.06
Nodes (45): GetTeachersDto, ApiPropertyOptional, IsBooleanString, IsEnum, IsOptional, Type, ResponseTeacherDto, ApiProperty (+37 more)

### Community 26 - "Schedule"
Cohesion: 0.06
Nodes (39): CreateScheduleDto, CreateSchedulesBulkDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsArray, IsBoolean, IsInt (+31 more)

### Community 27 - "audit.service.ts"
Cohesion: 0.18
Nodes (12): AuditLogsPageDto, ApiProperty, EntityAuditHistoryDto, ApiProperty, src_audit_dto_index_auditlogspagedto, src_audit_dto_index_entityaudithistorydto, src_audit_dto_index_getauditlogsdto, src_audit_dto_index_responseauditlogdto (+4 more)

### Community 28 - "@nestjs/testing"
Cohesion: 0.13
Nodes (10): @nestjs/testing, AppController, Controller, Get, AppModule, Module, AppService, Injectable (+2 more)

### Community 29 - "recovery-password.service.ts"
Cohesion: 0.09
Nodes (18): ref_jsonwebtoken, @nestjs/jwt, passport-jwt, Inject, ChangePasswordService, Inject, Injectable, src_auth_change_password_dto_index_changepasswordresponsedto (+10 more)

### Community 30 - "login.service.ts"
Cohesion: 0.09
Nodes (17): bcrypt, @nestjs/core, @nestjs/passport, passport-local, src_auth_jwt_auth_index_jwt_const, src_auth_login_dto_index_loginuserresponsedto, src_auth_login_dto_index_userlogindto, UserLoginDto (+9 more)

### Community 31 - "audit.module.ts"
Cohesion: 0.15
Nodes (10): AuditCaptureService, Injectable, AuditDiffService, Injectable, AuditInterceptor, RequestUser, Injectable, AuditModule (+2 more)

### Community 32 - "InscriptionController"
Cohesion: 0.14
Nodes (15): CloseInscriptionDto, ApiProperty, IsArray, IsNumber, Type, InscriptionController, ApiResponse, ApiTags (+7 more)

### Community 33 - "subject.service.ts"
Cohesion: 0.06
Nodes (37): CreateSubjectDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsOptional, IsString, Type, GetSubjectDepartmentDto (+29 more)

### Community 34 - "scripts"
Cohesion: 0.10
Nodes (21): scripts, build, build:client, build:client:full, format, generate:clients, generate:clients-legacy, generate:clients-legacy2 (+13 more)

### Community 35 - "AuthController"
Cohesion: 0.12
Nodes (22): Put, AuthController, ApiResponse, ApiTags, Body, Controller, Get, Param (+14 more)

### Community 36 - "UserService"
Cohesion: 0.09
Nodes (19): ApiHideProperty, Exclude, hashPassword(), ApiProperty, IsBoolean, IsNotEmpty, IsOptional, IsString (+11 more)

### Community 37 - "InscriptionService"
Cohesion: 0.13
Nodes (14): ResponseInscriptionDto, ApiProperty, IsNotEmpty, IsString, Type, InscriptionService, Injectable, ResponseSectionDto (+6 more)

### Community 38 - "response-teacher-degree.dto.ts"
Cohesion: 0.14
Nodes (20): normalizeText(), stripAccents(), normalizeSubjectCode(), attemptNumbers(), EvaluatedGrade, GradeFacts, gradeStatus(), subjectKey() (+12 more)

### Community 39 - "SectionService"
Cohesion: 0.25
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

### Community 43 - "search-teacher-grade.dto.ts"
Cohesion: 0.18
Nodes (13): SubjectRefDto, ResponseTeacherGradeSearchDto, SearchTeacherGradeDto, TeacherGradeMatchDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsNumber (+5 more)

### Community 44 - "audit-capture.service.ts"
Cohesion: 0.17
Nodes (17): AuditRequestShape, EXCLUDED_PREFIXES, httpMethodToAuditAction(), maskSensitivePath(), MUTATING_METHODS, normalizePath(), parseAuthResource(), parseResourceFromPath() (+9 more)

### Community 45 - "Department"
Cohesion: 0.14
Nodes (17): src_repositories_base_index_identity, InjectRepository, Career, Column, Entity, JoinColumn, ManyToMany, ManyToOne (+9 more)

### Community 46 - "mail.service.ts"
Cohesion: 0.21
Nodes (7): @nestjs-modules/mailer, MailModule, Module, MailService, Injectable, recovery(), welcome()

### Community 47 - ".import"
Cohesion: 0.15
Nodes (13): SubjectDemandController, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, Controller, Get (+5 more)

### Community 48 - "ScheduleConflictsQueryDto"
Cohesion: 0.24
Nodes (14): Matches, FreeSlotsQueryDto, PlanningPeriodQueryDto, ScheduleConflictsQueryDto, ApiProperty, ApiPropertyOptional, ArrayNotEmpty, IsBoolean (+6 more)

### Community 50 - "AuditAction"
Cohesion: 0.14
Nodes (13): CreateAuditEntryParams, AuditAction, AuthChangePassword, AuthLogin, AuthLogout, AuthOther, AuthRecoveryComplete, AuthRecoveryRequest (+5 more)

### Community 51 - "department.service.ts"
Cohesion: 0.06
Nodes (40): DepartmentController, ApiResponse, ApiTags, Body, Controller, Get, Param, Patch (+32 more)

### Community 52 - "UserController"
Cohesion: 0.18
Nodes (10): ApiResponse, ApiTags, Body, Controller, Get, Param, Patch, Post (+2 more)

### Community 53 - "common/index.ts"
Cohesion: 0.31
Nodes (3): PaginationDataDto, PaginationDto, pagination()

### Community 54 - ".findByEntity"
Cohesion: 0.21
Nodes (9): ApiParam, AuditController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+1 more)

### Community 55 - "Section"
Cohesion: 0.10
Nodes (28): CreateDateColumn, typeorm, IdEntity, Column, PrimaryGeneratedColumn, src_repositories_classroom_entities_index_classroom, InjectRepository, Day (+20 more)

### Community 56 - "AuditService"
Cohesion: 0.21
Nodes (7): AuditService, Injectable, InjectRepository, AuditLog, Column, Entity, PrimaryGeneratedColumn

### Community 57 - "teacher-degree.service.ts"
Cohesion: 0.14
Nodes (20): @nestjs/platform-express, src_common_upload_index_file_upload_body, src_common_upload_index_max_upload_size, pickDegreeFields(), src_repositories_teacher_dto_index_createteacherdegreedto, src_repositories_teacher_dto_index_pickdegreefields, src_repositories_teacher_dto_index_responseteacherdegreedto, src_repositories_teacher_dto_index_responseteacherdto (+12 more)

### Community 58 - "Contrato de estadísticas para frontend con Chart.js"
Cohesion: 0.18
Nodes (10): Comparaciones entre períodos, Comparación de demanda por asignatura, Contrato de estadísticas para frontend con Chart.js, Endpoints de estadísticas, Formato recomendado, Mapeo sugerido para Chart.js, Principios, Qué conviene evitar (+2 more)

### Community 59 - "Inscription"
Cohesion: 0.20
Nodes (8): Inscription, Column, Entity, Index, JoinColumn, ManyToOne, Inject, InjectRepository

### Community 60 - "jest"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 61 - "CreateTeacherDegreeDto"
Cohesion: 0.11
Nodes (29): IsPositive, CreateTeacherDegreeDto, DEGREE_FIELDS, TeacherDegreePeriodDto, TeacherGradeDto, ApiProperty, ApiPropertyOptional, IsArray (+21 more)

### Community 62 - "period.service.ts"
Cohesion: 0.12
Nodes (20): CreatePeriodDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional (+12 more)

### Community 63 - "README.md"
Cohesion: 0.25
Nodes (7): Description, Installation, License, Running the app, Stay in touch, Support, Test

### Community 64 - "auth.controller.ts"
Cohesion: 0.07
Nodes (29): ref_express, ref_express_serve_static_core, AuthModule, Module, src_auth_change_password_index_changepassworddto, src_auth_change_password_index_changepasswordresponsedto, src_auth_change_password_index_changepasswordservice, getDefaultCokieOptions() (+21 more)

### Community 65 - "SubjectDemand"
Cohesion: 0.18
Nodes (10): SubjectDemand, Column, Entity, JoinColumn, ManyToOne, DemandRow, SubjectDemandService, Injectable (+2 more)

### Community 66 - "School"
Cohesion: 0.16
Nodes (14): CreateSchoolDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsOptional, IsString, UpdateSchoolDto (+6 more)

### Community 67 - "GetAuditLogsDto"
Cohesion: 0.29
Nodes (7): GetAuditLogsDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 68 - "nest-cli.json"
Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 69 - "openapi.js"
Cohesion: 0.29
Nodes (7): download(), execute(), fs, https, ref_child_process, ref_fs, ref_https

### Community 70 - "create-document.dto.ts"
Cohesion: 0.38
Nodes (4): src_repositories_document_entities_index_documente, src_repositories_document_enum_index_typedocument, TypeDocument, AcademicCharge

### Community 71 - "transcript-ai.reader.ts"
Cohesion: 0.17
Nodes (20): pdf-parse, src_repositories_teacher_dto_index_teacherdegreeperioddto, src_repositories_teacher_dto_index_teachergradedto, buildRequest(), callModel(), failure(), FALLBACK_STATUS, parseModelJson() (+12 more)

### Community 72 - "Classroom"
Cohesion: 0.15
Nodes (11): Classroom, Column, Entity, JoinTable, ManyToMany, ScheduleConflictService, Injectable, SchedulePlanningService (+3 more)

### Community 73 - "openapitools.json"
Cohesion: 0.40
Nodes (4): generator-cli, version, $schema, spaces

### Community 74 - "LoginUserResponseDto"
Cohesion: 0.32
Nodes (8): LoginDto, LoginUserResponseDto, ApiProperty, IsNotEmpty, IsNumber, IsOptional, IsString, Type

### Community 75 - "tsconfig.build.json"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

### Community 76 - "GetSubjectDemandDto"
Cohesion: 0.25
Nodes (6): GetSubjectDemandDto, ApiPropertyOptional, IsOptional, Type, ResponseSubjectDemandDto, ApiProperty

### Community 82 - "property-diff.util.ts"
Cohesion: 0.52
Nodes (5): buildCreateFieldSummary(), buildPropertyChangeMap(), normalizeCompare(), serializeForAudit(), stringifyPropertyChanges()

### Community 85 - "QueryBaseDto"
Cohesion: 0.67
Nodes (3): QueryBaseDto, ApiPropertyOptional, Type

## Knowledge Gaps
- **258 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `plugins` (+253 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 864 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `@nestjs/common` to `statistics.service.ts`, `classroom.service.ts`, `teacher.service.ts`, `document.service.ts`, `day.service.ts`, `CrudRepository`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `subject-demand.parser.ts`, `section.service.ts`, `Subject`, `Delete`, `section-teacher.service.ts`, `Schedule`, `audit.service.ts`, `@nestjs/testing`, `recovery-password.service.ts`, `login.service.ts`, `audit.module.ts`, `subject.service.ts`, `audit-capture.service.ts`, `mail.service.ts`, `department.service.ts`, `Section`, `teacher-degree.service.ts`, `period.service.ts`, `auth.controller.ts`, `School`, `transcript-ai.reader.ts`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **Why does `@nestjs/swagger` connect `@nestjs/swagger` to `statistics.service.ts`, `classroom.service.ts`, `teacher.service.ts`, `document.service.ts`, `day.service.ts`, `CrudRepository`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `Delete`, `Teacher`, `audit.service.ts`, `@nestjs/testing`, `login.service.ts`, `subject.service.ts`, `AuthController`, `response-teacher-degree.dto.ts`, `search-teacher-grade.dto.ts`, `Department`, `department.service.ts`, `Section`, `teacher-degree.service.ts`, `CreateTeacherDegreeDto`, `period.service.ts`, `auth.controller.ts`, `School`, `create-document.dto.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `@nestjs/typeorm` connect `@nestjs/common` to `statistics.service.ts`, `classroom.service.ts`, `teacher.service.ts`, `document.service.ts`, `day.service.ts`, `CrudRepository`, `package.json`, `schedule-planning.service.ts`, `user.service.ts`, `inscription.service.ts`, `subject-demand.service.ts`, `section.service.ts`, `Subject`, `section-teacher.service.ts`, `Schedule`, `audit.service.ts`, `@nestjs/testing`, `audit.module.ts`, `subject.service.ts`, `department.service.ts`, `Section`, `teacher-degree.service.ts`, `period.service.ts`, `School`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _258 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `statistics.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0568986568986569 - nodes in this community are weakly interconnected._
- **Should `ScheduleController` be split into smaller, more focused modules?**
  _Cohesion score 0.1253968253968254 - nodes in this community are weakly interconnected._
- **Should `classroom.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05734767025089606 - nodes in this community are weakly interconnected._