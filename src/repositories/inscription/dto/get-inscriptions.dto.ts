import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBooleanString,
  IsOptional,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { StageInscription } from '../enums';

export class GetInscriptionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  stage?: StageInscription;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  sectionId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  careerId?: number;

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
  @Type(() => Number)
  teacherId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  subjectId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  semester?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  schedules?: boolean;
}
