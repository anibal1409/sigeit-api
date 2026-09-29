import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Classroom } from '../classroom/entities';
import { Day } from '../day/entities';
import { Period } from '../period/entities';
import { Section } from '../section/entities';
import { SubjectDemand } from '../subject-demand/entities';
import { Schedule } from './entities';
import { ScheduleConflictService } from './schedule-conflict.service';
import { SchedulePlanningService } from './schedule-planning.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      Period,
      Section,
      SubjectDemand,
      Day,
      Classroom,
    ]),
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    ScheduleConflictService,
    SchedulePlanningService,
  ],
  exports: [TypeOrmModule, ScheduleService],
})
export class ScheduleModule {}
