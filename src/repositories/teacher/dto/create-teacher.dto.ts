import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { Career } from '../../career/entities';
import {
  EmploymentStatus,
  HiringEvaluationStatus,
  TeacherCategory,
  TeacherDedication,
} from '../enum';

export class CreateTeacherDto extends PartialType(
  OmitType(Career, ['updatedAt', 'createdAt', 'deleted', 'department']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idDocument: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  department: IdCreateEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

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
    enum: TeacherDedication,
    enumName: 'TeacherDedication',
  })
  @IsOptional()
  @IsEnum(TeacherDedication)
  dedication?: TeacherDedication;

  @ApiPropertyOptional({
    enum: HiringEvaluationStatus,
    enumName: 'HiringEvaluationStatus',
    nullable: true,
    description: 'Nulo si el profesor no está en un proceso de contratación',
  })
  @IsOptional()
  @IsEnum(HiringEvaluationStatus)
  hiringEvaluationStatus?: HiringEvaluationStatus;

  @ApiPropertyOptional({ nullable: true, example: '2026-09-30' })
  @IsOptional()
  @IsDateString()
  hiringEvaluationDate?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  hiringEvaluationNotes?: string;
}
