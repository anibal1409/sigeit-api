import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { strictValidation } from '../common/validation';
import { AllowRoles } from '../auth/roles';
import { Roles } from '../repositories/user/enums';
import { AuditService } from './audit.service';
import {
  AuditLogsPageDto,
  AuditStatsDto,
  EntityAuditHistoryDto,
  GetAuditLogsDto,
  GetAuditStatsDto,
  ResponseAuditLogDto,
} from './dto';

/**
 * Consulta de registros de auditoría (solo administrador).
 */
@ApiTags('audit')
@AllowRoles(Roles.Administrator)
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @ApiOperation({
    summary: 'Listar registros de auditoría (paginado y filtrado)',
    description:
      'Filtros por usuario, acción, recurso, fechas, éxito, búsqueda libre, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada',
    type: AuditLogsPageDto,
  })
  @ApiForbiddenResponse({ description: 'Solo administrador' })
  findLogs(@Query(strictValidation) query: GetAuditLogsDto) {
    return this.auditService.findPage(query);
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Detalle de un registro de auditoría' })
  @ApiResponse({ status: 200, type: ResponseAuditLogDto })
  @ApiNotFoundResponse({ description: 'Registro no encontrado' })
  @ApiForbiddenResponse({ description: 'Solo administrador' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auditService.findOne(id);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Estadísticas y KPIs de auditoría',
    description:
      'Totales, éxitos/fallos, actores distintos, desglose por acción, recurso y día.',
  })
  @ApiResponse({ status: 200, type: AuditStatsDto })
  @ApiForbiddenResponse({ description: 'Solo administrador' })
  findStats(@Query(strictValidation) query: GetAuditStatsDto) {
    return this.auditService.findStats(query);
  }

  @Get('entity/:resource/:entityId')
  @ApiOperation({
    summary: 'Historial de cambios de un registro',
    description:
      'Devuelve todos los eventos donde resource y resourceId coinciden (p. ej. period / 12).',
  })
  @ApiParam({ name: 'resource', example: 'period' })
  @ApiParam({ name: 'entityId', example: 12 })
  @ApiResponse({ status: 200, type: EntityAuditHistoryDto })
  @ApiForbiddenResponse({ description: 'Solo administrador' })
  findByEntity(
    @Param('resource') resource: string,
    @Param('entityId', ParseIntPipe) entityId: number,
  ): Promise<EntityAuditHistoryDto> {
    return this.auditService.findByEntity(resource, entityId);
  }
}
