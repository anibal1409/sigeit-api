import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetSchedulesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  sectionId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  subjectId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  periodId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  teacherId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  semester?: number;
  
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  dayId?: number;

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
  @Type(() => Boolean)
  status?: boolean;
}
