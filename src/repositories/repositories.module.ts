import { Module } from '@nestjs/common';

import { CareerModule } from './career/career.module';
import { ClassroomModule } from './classroom/classroom.module';
import { DayModule } from './day/day.module';
import { DepartmentModule } from './department';
import { DocumentModule } from './document';
import { InscriptionModule } from './inscription';
import { PeriodModule } from './period/period.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SchoolModule } from './school/school.module';
import { SectionModule } from './section/section.module';
import { SubjectModule } from './subject/subject.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CareerModule,
    SchoolModule,
    DepartmentModule,
    UserModule,
    DayModule,
    PeriodModule,
    SubjectModule,
    TeacherModule,
    SectionModule,
    ScheduleModule,
    ClassroomModule,
    DocumentModule,
    InscriptionModule,
  ],
  exports: [UserModule],
})
export class RepositoriesModule {}
