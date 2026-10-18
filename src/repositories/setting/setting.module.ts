import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School } from '../school/entities';
import { Department } from '../department/entities';
import { UserModule } from '../user/user.module';
import { DepartmentSettingService } from './department-setting.service';
import { DepartmentSetting, Setting } from './entities';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

/** Módulo de configuración general del instituto. */
@Module({
  imports: [
    TypeOrmModule.forFeature([Setting, DepartmentSetting, School, Department]),
    UserModule,
  ],
  controllers: [SettingController],
  providers: [SettingService, DepartmentSettingService],
})
export class SettingModule {}
