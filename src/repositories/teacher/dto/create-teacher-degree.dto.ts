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

/** Asignatura del pensum; al guardar solo se usa `id`, `code` y `name` son informativos. */
export class SubjectRefDto extends IdCreateEntity {
  @ApiPropertyOptional({ example: '0715963' })
  code?: string;

  @ApiPropertyOptional({ example: 'Programación Orientada a Objetos' })
  name?: string;
}

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

  @ApiPropertyOptional({
    type: SubjectRefDto,
    description:
      'Asignatura del pensum a la que equivale; en la vista previa es una sugerencia',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SubjectRefDto)
  subject?: SubjectRefDto;
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

  @ApiPropertyOptional({
    type: [TeacherGradeDto],
    default: [],
    description:
      'Notas del título; se puede registrar solo el título y agregarlas después',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherGradeDto)
  grades?: TeacherGradeDto[];
}
