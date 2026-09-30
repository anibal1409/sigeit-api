import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
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

  @ApiPropertyOptional({
    description: 'Créditos o unidades de crédito (UC) de la asignatura',
    example: 4,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  credits?: number;

  @ApiPropertyOptional({
    description: 'Aprobada en examen de reparación (tipo de examen "R")',
  })
  @IsOptional()
  @IsBoolean()
  makeup?: boolean;
}

/** Período académico cursado, con el resumen que indique el documento. */
export class TeacherDegreePeriodDto {
  @ApiProperty({ description: 'Código del período', example: '2013-1' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiPropertyOptional({
    description: 'Fechas o descripción del período',
    example: 'Mar - Dic 2013',
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ description: 'Promedio del período', example: 8 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  average?: number;

  @ApiPropertyOptional({ description: 'Créditos aprobados en el período' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedCredits?: number;
}

/** Campos propios del título que se guardan y se devuelven tal cual. */
const DEGREE_FIELDS = [
  'level',
  'title',
  'institution',
  'graduationDate',
  'maxGrade',
  'minPassingGrade',
  'average',
  'approvedCredits',
  'classRank',
  'classSize',
  'classAverage',
  'onlyPassingGrades',
  'periods',
] as const;

/** Campos del título presentes en `source`, sin propiedades ajenas (id, deleted, teacher...). */
export function pickDegreeFields(
  source: object,
): Partial<Pick<CreateTeacherDegreeDto, (typeof DEGREE_FIELDS)[number]>> {
  return Object.fromEntries(
    DEGREE_FIELDS.filter((field) => field in source).map((field) => [
      field,
      source[field],
    ]),
  );
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
    description:
      'Nota mínima aprobatoria; si no se indica, se asume la mitad de la escala',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPassingGrade?: number;

  @ApiPropertyOptional({
    description: 'Promedio general de la carrera según el documento',
    example: 7.66,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  average?: number;

  @ApiPropertyOptional({ description: 'Créditos (UC) aprobados en total' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedCredits?: number;

  @ApiPropertyOptional({ description: 'Puesto en su promoción de egresados' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  classRank?: number;

  @ApiPropertyOptional({ description: 'Cantidad de egresados de la promoción' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  classSize?: number;

  @ApiPropertyOptional({ description: 'Promedio de la promoción' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  classAverage?: number;

  @ApiPropertyOptional({
    description:
      'El documento solo incluye notas aprobatorias (no muestra retiros ni reprobadas)',
  })
  @IsOptional()
  @IsBoolean()
  onlyPassingGrades?: boolean;

  @ApiPropertyOptional({ type: [TeacherDegreePeriodDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherDegreePeriodDto)
  periods?: TeacherDegreePeriodDto[];

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
