import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

/** Filtros para consultar la demanda de un período. */
export class GetSubjectDemandDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;
}
