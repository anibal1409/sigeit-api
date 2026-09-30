import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Section } from '../section/entities';
import { Teacher, TeacherDegree, TeacherGrade } from './entities';
import { TeacherDegreeController } from './teacher-degree.controller';
import { TeacherDegreeService } from './teacher-degree.service';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, TeacherDegree, TeacherGrade, Section]),
  ],
  controllers: [TeacherController, TeacherDegreeController],
  providers: [TeacherService, TeacherDegreeService],
  exports: [TypeOrmModule, TeacherService],
})
export class TeacherModule {}
