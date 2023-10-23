import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTeachersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  schoolId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;
}

