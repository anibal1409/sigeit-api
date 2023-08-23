import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Subject,
  SubjectCarrer,
} from './entities';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectCarrer])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
