import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { Classroom } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}
