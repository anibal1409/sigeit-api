import { Type } from 'class-transformer';
import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  EmploymentStatus,
  HiringEvaluationStatus,
  TeacherCategory,
} from '../enum';

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

  @ApiPropertyOptional({ enum: TeacherCategory, enumName: 'TeacherCategory' })
  @IsOptional()
  @IsEnum(TeacherCategory)
  category?: TeacherCategory;

  @ApiPropertyOptional({
    enum: EmploymentStatus,
    enumName: 'EmploymentStatus',
  })
  @IsOptional()
  @IsEnum(EmploymentStatus)
  employmentStatus?: EmploymentStatus;

  @ApiPropertyOptional({
    enum: HiringEvaluationStatus,
    enumName: 'HiringEvaluationStatus',
  })
  @IsOptional()
  @IsEnum(HiringEvaluationStatus)
  hiringEvaluationStatus?: HiringEvaluationStatus;
}
