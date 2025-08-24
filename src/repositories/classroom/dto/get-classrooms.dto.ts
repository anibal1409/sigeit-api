import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBooleanString,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetClassroomsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  classroomId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;
}
