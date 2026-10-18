import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School } from '../school/entities';
import { User } from '../user/entities';
import { Setting } from './entities';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

/** Módulo de configuración general del instituto. */
@Module({
  imports: [TypeOrmModule.forFeature([Setting, School, User])],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
