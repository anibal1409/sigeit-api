import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetSubjectDepartmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  semester?: number;
}
