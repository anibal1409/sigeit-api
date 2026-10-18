import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School } from '../school/entities';
import { Department } from '../department/entities';
import { DepartmentSettingService } from './department-setting.service';
import { DepartmentSetting, Setting } from './entities';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

/** Módulo de configuración general del instituto. */
@Module({
  imports: [
    TypeOrmModule.forFeature([Setting, DepartmentSetting, School, Department]),
  ],
  controllers: [SettingController],
  providers: [SettingService, DepartmentSettingService],
})
export class SettingModule {}
