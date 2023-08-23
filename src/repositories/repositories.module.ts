import { Module } from '@nestjs/common';

import { CareerModule } from './career/career.module';
import { DayModule } from './day/day.module';
import { DepartamentModule } from './departament/departament.module';
import { PeriodModule } from './period/period.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SchoolModule } from './school/school.module';
import { SectionModule } from './section/section.module';
import { SubjectModule } from './subject/subject.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [
    CareerModule,
    SchoolModule,
    DepartamentModule,
    UserModule,
    DayModule,
    PeriodModule,
    SubjectModule,
    TeacherModule,
    SectionModule,
    ScheduleModule,
    ClassroomModule,
  ],
})
export class RepositoriesModule {}
