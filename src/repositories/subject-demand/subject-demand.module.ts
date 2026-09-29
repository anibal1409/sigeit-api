import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeriodModule } from '../period/period.module';
import { SubjectModule } from '../subject/subject.module';
import { SubjectDemand } from './entities';
import { SubjectDemandController } from './subject-demand.controller';
import { SubjectDemandService } from './subject-demand.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectDemand]),
    PeriodModule,
    SubjectModule,
  ],
  controllers: [SubjectDemandController],
  providers: [SubjectDemandService],
  exports: [TypeOrmModule, SubjectDemandService],
})
export class SubjectDemandModule {}
