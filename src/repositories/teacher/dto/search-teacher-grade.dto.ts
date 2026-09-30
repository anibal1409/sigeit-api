import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DegreeLevel } from '../enum';
import { SubjectRefDto } from './create-teacher-degree.dto';
import { ResponseTeacherDto } from './response-teacher.dto';

/** Filtros para buscar profesores por las notas de sus títulos. */
export class SearchTeacherGradeDto {
  @ApiProperty({
    description:
      'Texto de la asignatura; ignora mayúsculas y tildes, exige todas las palabras y también busca en el nombre de la asignatura equivalente del pensum',
    example: 'programacion objetos',
  })
  @IsNotEmpty()
  @IsString()
  subject!: string;

  @ApiPropertyOptional({
    description:
      'Nota mínima en porcentaje de la escala (0–100); excluye asignaturas sin nota numérica',
    example: 70,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  minPercent?: number;
}

/** Asignatura que coincide con la búsqueda. */
export class TeacherGradeMatchDto {
  @ApiPropertyOptional()
  code?: string;

  @ApiProperty()
  subjectName!: string;

  @ApiPropertyOptional()
  period?: string;

  @ApiPropertyOptional()
  grade?: number;

  @ApiPropertyOptional()
  remark?: string;

  @ApiProperty()
  maxGrade!: number;

  @ApiPropertyOptional({ description: 'Nota en porcentaje de la escala' })
  percent?: number;

  @ApiProperty()
  degreeTitle!: string;

  @ApiProperty({ enum: DegreeLevel, enumName: 'DegreeLevel' })
  degreeLevel!: DegreeLevel;

  @ApiPropertyOptional({
    type: SubjectRefDto,
    description: 'Asignatura del pensum a la que equivale la nota',
  })
  subject?: SubjectRefDto;
}

/** Profesor con las asignaturas que coinciden, de mejor a peor nota. */
export class ResponseTeacherGradeSearchDto {
  @ApiProperty({ type: ResponseTeacherDto })
  teacher!: ResponseTeacherDto;

  @ApiProperty({ type: [TeacherGradeMatchDto] })
  matches!: TeacherGradeMatchDto[];
}
