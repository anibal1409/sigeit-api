import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

/** Hora en formato HH:mm (00:00–23:59). */
const HOUR = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Campos editables de la configuración; todos opcionales. */
export class UpdateSettingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  instituteName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  instituteAbbreviation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ example: '07:00' })
  @IsOptional()
  @Matches(HOUR)
  startTime?: string;

  @ApiPropertyOptional({ example: '18:00' })
  @IsOptional()
  @Matches(HOUR)
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(240)
  duration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  interval?: number;
}
