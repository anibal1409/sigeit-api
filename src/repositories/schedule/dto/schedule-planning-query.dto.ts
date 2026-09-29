import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TIME_PATTERN } from '../schedule-time.util';

/** Convierte "true"/"false" de la query string en booleano. */
const toBoolean = ({ value }: { value: unknown }) =>
  value === true || value === 'true';

/** Período y departamento opcional sobre los que se consulta la planificación. */
export class PlanningPeriodQueryDto {
  @ApiProperty({ description: 'Período académico' })
  @Type(() => Number)
  @IsInt()
  periodId: number;

  @ApiPropertyOptional({
    description: 'Filtra por departamento de la asignatura',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departmentId?: number;
}

/** Bloque candidato cuyos choques se quieren conocer antes de guardarlo. */
export class ScheduleConflictsQueryDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  periodId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  dayId: number;

  @ApiProperty({ example: '07:00', description: 'Hora de inicio HH:mm' })
  @IsNotEmpty()
  @Matches(TIME_PATTERN)
  start: string;

  @ApiProperty({ example: '08:30', description: 'Hora de fin HH:mm' })
  @IsNotEmpty()
  @Matches(TIME_PATTERN)
  end: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  classroomId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  sectionId: number;

  @ApiPropertyOptional({
    description: 'Horario que se está editando (se ignora)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  excludeId?: number;
}

/** Parámetros para buscar bloques libres de una sección. */
export class FreeSlotsQueryDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  periodId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  sectionId: number;

  @ApiPropertyOptional({
    default: 1,
    description: 'Horas académicas seguidas del bloque',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  hours?: number;

  @ApiPropertyOptional({ description: 'Limita la búsqueda a un día' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  dayId?: number;

  @ApiPropertyOptional({
    default: false,
    description: 'Incluye aulas de otros departamentos',
  })
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  allClassrooms?: boolean;

  @ApiPropertyOptional({
    description: 'Horario que se está editando (se ignora)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  excludeId?: number;
}
