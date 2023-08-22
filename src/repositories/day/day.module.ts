import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DayController } from './day.controller';
import { DayService } from './day.service';
import { Day } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Day]),
  ],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
