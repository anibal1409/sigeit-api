import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUserId } from '../user/permissions';
import { DepartmentSettingService } from './department-setting.service';
import {
  ReserveOfficeNumbersDto,
  ResponseDepartmentSettingDto,
  ResponseOfficeNumbersDto,
  ResponseSettingDto,
  UpdateDepartmentSettingDto,
  UpdateSettingDto,
} from './dto';
import { SettingService } from './setting.service';

/** Configuración del instituto (fila única) y correlativo de oficios por departamento. */
@ApiTags('setting')
@Controller('setting')
export class SettingController {
  constructor(
    private readonly settingService: SettingService,
    private readonly departmentSettingService: DepartmentSettingService,
  ) {}

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
  update(
    @CurrentUserId() userId: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingService.update(userId, updateSettingDto);
  }

  @Get('department')
  @ApiOperation({
    summary: 'Correlativo de oficios de todos los departamentos',
    description: 'Crea con valores por defecto las filas que falten.',
  })
  @ApiResponse({ type: ResponseDepartmentSettingDto, isArray: true })
  findDepartments() {
    return this.departmentSettingService.findAll();
  }

  @Get('department/:departmentId')
  @ApiOperation({
    summary: 'Correlativo de oficios de un departamento',
    description: 'officeLastNumber es 0 si officeYear no es el año en curso.',
  })
  @ApiResponse({ type: ResponseDepartmentSettingDto })
  @ApiNotFoundResponse({ description: 'Departamento no encontrado' })
  findDepartment(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.departmentSettingService.findOne(departmentId);
  }

  @Patch('department/:departmentId')
  @ApiOperation({
    summary:
      'Actualizar el correlativo (Administrador o jefe del departamento)',
  })
  @ApiResponse({ type: ResponseDepartmentSettingDto })
  @ApiForbiddenResponse({ description: 'Sin permiso sobre el departamento' })
  updateDepartment(
    @CurrentUserId() userId: number,
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Body() updateDto: UpdateDepartmentSettingDto,
  ) {
    return this.departmentSettingService.update(
      userId,
      departmentId,
      updateDto,
    );
  }

  @Post('department/:departmentId/office-numbers')
  @ApiOperation({
    summary: 'Reservar números de oficio de forma atómica',
    description:
      'Sin start: last+1…last+count. Con start: start…start+count-1. Reinicia si cambia el año.',
  })
  @ApiResponse({ status: 201, type: ResponseOfficeNumbersDto })
  @ApiNotFoundResponse({ description: 'Departamento no encontrado' })
  reserveOfficeNumbers(
    @Param('departmentId', ParseIntPipe) departmentId: number,
    @Body() dto: ReserveOfficeNumbersDto,
  ) {
    return this.departmentSettingService.reserve(departmentId, dto);
  }
}
