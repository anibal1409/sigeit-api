import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

/** Normaliza query `periodIds=1,2` o `periodIds=1&periodIds=2` a número[]. */
function parsePeriodIdsQuery(value: unknown): number[] {
  const parts: string[] = Array.isArray(value)
    ? value.flatMap((v) => String(v).split(','))
    : String(value ?? '').split(',');
  return parts
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
}

/**
 * Query para comparar varios períodos: lista de IDs separados por coma.
 */
export class PeriodComparisonQueryDto {
  @ApiProperty({
    example: '1,2,5',
    description: 'IDs separados por coma, o repetidos (?periodIds=1&periodIds=2).',
  })
  @Transform(({ value }) => parsePeriodIdsQuery(value))
  @IsArray()
  @ArrayMinSize(1, { message: 'Indica al menos un periodId válido.' })
  @IsInt({ each: true })
  periodIds!: number[];
}

/**
 * Query con un único período académico obligatorio.
 */
export class SinglePeriodQueryDto {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  periodId!: number;
}

/**
 * Opcional: filtra estadísticas de horario por aula.
 */
export class PeriodAndOptionalClassroomQueryDto extends SinglePeriodQueryDto {
  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === ''
      ? undefined
      : parseInt(value, 10),
  )
  @IsInt()
  @Min(1)
  classroomId?: number;
}
