import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
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

import { Period } from '../entities';
import { StagePeriod } from '../enum';

export class CreatePeriodDto extends PartialType(
  OmitType(Period, ['updatedAt', 'createdAt', 'deleted']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stage: StagePeriod;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  interval: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  duration: number;

  @ApiProperty({
    description:
      'Copiar secciones y horarios de otro período. false = período vacío. Sin copyFromPeriodId se usa el último período planificado o, en su defecto, el más reciente.',
  })
  @IsNotEmpty()
  @IsBoolean()
  copyPrevious!: boolean;

  @ApiPropertyOptional({
    description:
      'Período del cual copiar secciones y horarios (opcional). Solo aplica si copyPrevious es true.',
  })
  @IsOptional()
  @IsInt()
  copyFromPeriodId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Marcar como período activo (solo uno puede estarlo)',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Indica si el período académico es un curso vacacional',
  })
  @IsOptional()
  @IsBoolean()
  isVacationCourse?: boolean;
}
