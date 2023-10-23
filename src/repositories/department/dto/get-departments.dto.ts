import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetDepartmentsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  schoolId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;
}

