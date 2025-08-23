import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subject } from './entities';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [TypeOrmModule, SubjectService],
})
export class SubjectModule {}
