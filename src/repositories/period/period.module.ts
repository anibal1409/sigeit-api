import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Period } from './entities';
import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Period]),
  ],
  controllers: [PeriodController],
  providers: [PeriodService],
})
export class PeriodModule {}
