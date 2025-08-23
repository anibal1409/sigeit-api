import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscriptionModule } from '../inscription/inscription.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { Section } from './entities';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section]),
    forwardRef(() => ScheduleModule),
    forwardRef(() => InscriptionModule),
  ],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService, TypeOrmModule],
})
export class SectionModule {}
