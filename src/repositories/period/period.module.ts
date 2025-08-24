import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '../schedule/schedule.module';
import { SectionModule } from '../section/section.module';
import { Period } from './entities';
import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Period]),
    forwardRef(() => ScheduleModule),
    SectionModule,
  ],
  controllers: [PeriodController],
  providers: [PeriodService],
  exports: [TypeOrmModule, PeriodService],
})
export class PeriodModule {}
