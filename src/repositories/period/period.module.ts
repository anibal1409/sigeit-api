import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '../schedule';
import { SectionModule } from '../section';
import { Period } from './entities';
import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';

@Module({
  imports: [TypeOrmModule.forFeature([Period]), ScheduleModule, SectionModule],
  controllers: [PeriodController],
  providers: [PeriodService],
})
export class PeriodModule {}
