import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

/**
 * Query para comparar varios períodos: lista de IDs separados por coma.
 */
export class PeriodComparisonQueryDto {
  @ApiProperty({
    example: '1,2,5',
    description: 'IDs de períodos separados por coma (mínimo uno).',
  })
  @IsString()
  @Transform(({ value }) =>
    String(value ?? '')
      .split(',')
      .map((s: string) => parseInt(s.trim(), 10))
      .filter((n: number) => !Number.isNaN(n)),
  )
  @IsArray()
  @ArrayMinSize(1)
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
