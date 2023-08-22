import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CareerController } from './career.controller';
import { CareerService } from './career.service';
import { Career } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Career]),
  ],
  controllers: [CareerController],
  providers: [CareerService]
})
export class CareerModule {}
