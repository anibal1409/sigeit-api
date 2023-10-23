import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '../schedule';
import { SectionModule } from '../section';
import { Inscription } from './entities';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscription]),
    SectionModule,
    ScheduleModule,
  ],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
