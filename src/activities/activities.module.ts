import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesController } from './activities.controller';
import { ActivityService } from './activities.service';
import { Activity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivitiesController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivitiesModule {}
