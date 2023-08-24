import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartamentController } from './departament.controller';
import { DepartamentService } from './departament.service';
import { Department } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
  ],
  controllers: [DepartamentController],
  providers: [DepartamentService],
})
export class DepartamentModule {}
