import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AuditLogFiltersDto } from './audit-log-filters.dto';

/**
 * Filtros del reporte PDF (mismos criterios que el listado, con tope de filas).
 */
export class GetAuditReportDto extends AuditLogFiltersDto {
  @ApiPropertyOptional({
    default: 500,
    minimum: 1,
    maximum: 2000,
    description: 'Máximo de eventos detallados incluidos en el PDF',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(2000)
  maxRows?: number = 500;
}
