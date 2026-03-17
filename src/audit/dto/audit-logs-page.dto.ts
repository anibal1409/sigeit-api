import { ApiProperty } from '@nestjs/swagger';

import { ResponseAuditLogDto } from './response-audit-log.dto';

/**
 * Respuesta paginada de listado de auditoría (Swagger).
 */
export class AuditLogsPageDto {
  @ApiProperty({ type: [ResponseAuditLogDto] })
  items!: ResponseAuditLogDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}
