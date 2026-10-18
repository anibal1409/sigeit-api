import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '../schedule/schedule.module';
import { Subject } from '../subject/entities';
import { Teacher, TeacherGrade } from '../teacher/entities';
import { Section } from './entities';
import { SectionTeacherService } from './section-teacher.service';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Teacher, TeacherGrade, Subject]),
    ScheduleModule,
  ],
  controllers: [SectionController],
  providers: [SectionService, SectionTeacherService],
  exports: [SectionService, TypeOrmModule],
})
export class SectionModule {}
