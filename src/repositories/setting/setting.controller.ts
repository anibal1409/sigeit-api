import { Request } from 'express';

import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseSettingDto, UpdateSettingDto } from './dto';
import { SettingService } from './setting.service';

/** Configuración única del instituto (sin `:id`). */
@ApiTags('setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  /** Devuelve la configuración; la crea con valores por defecto si no existe. */
  @Get()
  @ApiOperation({
    summary: 'Obtener la configuración del instituto',
    description: 'Si no existe, se crea con valores por defecto.',
  })
  @ApiResponse({ type: ResponseSettingDto })
  find() {
    return this.settingService.find();
  }

  /** Actualiza la configuración. Solo para administradores. */
  @Patch()
  @ApiOperation({ summary: 'Actualizar la configuración (solo Administrador)' })
  @ApiResponse({ type: ResponseSettingDto })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o endTime <= startTime',
  })
  @ApiForbiddenResponse({ description: 'El usuario no es Administrador' })
  update(@Req() request: Request, @Body() updateSettingDto: UpdateSettingDto) {
    const user = request.user as { userId: string };
    return this.settingService.update(+user?.userId, updateSettingDto);
  }
}
