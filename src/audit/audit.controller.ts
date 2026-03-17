import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuditService } from './audit.service';
import {
  AuditLogsPageDto,
  EntityAuditHistoryDto,
  GetAuditLogsDto,
} from './dto';

/**
 * Consulta de registros de auditoría (requiere sesión autenticada).
 */
@ApiTags('audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @ApiOperation({
    summary: 'Listar registros de auditoría (paginado)',
    description:
      'Incluye userAgent, clientSummary y propertyChanges (diff en updates, campos en creaciones).',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada',
    type: AuditLogsPageDto,
  })
  async findLogs(@Query() query: GetAuditLogsDto) {
    return this.auditService.findPage(query);
  }

  @Get('entity/:resource/:entityId')
  @ApiOperation({
    summary: 'Historial de cambios de un registro',
    description:
      'Devuelve todos los eventos de auditoría donde resource y resourceId ' +
      'coinciden con el tipo de entidad y el id (p. ej. period / 12).',
  })
  @ApiParam({ name: 'resource', example: 'period' })
  @ApiParam({ name: 'entityId', example: 12 })
  @ApiResponse({ status: 200, type: EntityAuditHistoryDto })
  async findByEntity(
    @Param('resource') resource: string,
    @Param('entityId', ParseIntPipe) entityId: number,
  ): Promise<EntityAuditHistoryDto> {
    return this.auditService.findByEntity(resource, entityId);
  }
}
