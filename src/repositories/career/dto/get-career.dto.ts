import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCareersDto {
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
  @IsBoolean()
  status?: boolean;
}

