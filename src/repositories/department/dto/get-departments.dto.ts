import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetDepartmentsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  schoolId?: number;
}

