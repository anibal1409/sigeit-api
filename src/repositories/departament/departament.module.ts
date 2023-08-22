import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartamentController } from './departament.controller';
import { DepartamentService } from './departament.service';
import { Departament } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departament]),
  ],
  controllers: [DepartamentController],
  providers: [DepartamentService],
})
export class DepartamentModule {}
