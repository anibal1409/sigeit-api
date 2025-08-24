import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '../schedule/schedule.module';
import { SectionModule } from '../section/section.module';
import { Inscription } from './entities';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscription]),
    forwardRef(() => SectionModule),
    forwardRef(() => ScheduleModule),
  ],
  controllers: [InscriptionController],
  providers: [InscriptionService],
  exports: [TypeOrmModule, InscriptionService],
})
export class InscriptionModule {}
