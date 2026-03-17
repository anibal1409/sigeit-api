import { ApiProperty } from '@nestjs/swagger';

import { ResponseAuditLogDto } from './response-audit-log.dto';

/**
 * Historial de auditoría para un registro concreto (tipo de entidad + id).
 */
export class EntityAuditHistoryDto {
  @ApiProperty({ example: 'period', description: 'Segmento de API / tabla lógica' })
  resource!: string;

  @ApiProperty({ example: 5 })
  entityId!: number;

  @ApiProperty({
    type: [ResponseAuditLogDto],
    description:
      'Registros ordenados del más reciente al más antiguo (mutaciones sobre ese id)',
  })
  records!: ResponseAuditLogDto[];
}
