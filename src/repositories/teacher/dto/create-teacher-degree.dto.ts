import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { DegreeLevel } from '../enum';

/** Nota de una asignatura cursada (registro manual o extraída de un récord). */
export class TeacherGradeDto {
  @ApiPropertyOptional({ example: '0081814' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Matemáticas I' })
  @IsNotEmpty()
  @IsString()
  subjectName!: string;

  @ApiPropertyOptional({ example: '2013-1' })
  @IsOptional()
  @IsString()
  period?: string;

  @ApiPropertyOptional({
    description: 'Nota numérica en la escala del título (maxGrade)',
    example: 9,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  grade?: number;

  @ApiPropertyOptional({
    description: 'Resultado no numérico (RETIRADA, APROBADO, EN EJECUCIÓN)',
  })
  @IsOptional()
  @IsString()
  remark?: string;
}

/** Datos para registrar un título de un profesor junto con sus notas. */
export class CreateTeacherDegreeDto {
  @ApiProperty({ type: IdCreateEntity })
  @ValidateNested()
  @Type(() => IdCreateEntity)
  teacher!: IdCreateEntity;

  @ApiProperty({ enum: DegreeLevel, enumName: 'DegreeLevel' })
  @IsEnum(DegreeLevel)
  level!: DegreeLevel;

  @ApiProperty({ example: 'Ingeniería de Sistemas' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ example: 'Universidad de Oriente' })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({ example: '2019-06-15' })
  @IsOptional()
  @IsDateString()
  graduationDate?: string;

  @ApiProperty({ description: 'Nota máxima de la escala', example: 10 })
  @IsNumber()
  @IsPositive()
  maxGrade!: number;

  @ApiProperty({ type: [TeacherGradeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherGradeDto)
  grades!: TeacherGradeDto[];
}
