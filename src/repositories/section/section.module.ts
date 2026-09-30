import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscriptionModule } from '../inscription/inscription.module';
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
    forwardRef(() => InscriptionModule),
  ],
  controllers: [SectionController],
  providers: [SectionService, SectionTeacherService],
  exports: [SectionService, TypeOrmModule],
})
export class SectionModule {}
