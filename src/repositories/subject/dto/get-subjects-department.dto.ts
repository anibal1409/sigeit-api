import { Type } from 'class-transformer';
import { IsBooleanString, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetSubjectDepartmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  semester?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  careerId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;
}
