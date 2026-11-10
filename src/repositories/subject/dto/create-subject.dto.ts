import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { Subject } from '../entities';

export class CreateSubjectDto extends PartialType(
  OmitType(Subject, [
    'updatedAt',
    'createdAt',
    'deleted',
    'careers',
    'department',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  credits!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Horas semanales totales (teoría + práctica)' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hours!: number;

  @ApiPropertyOptional({
    description:
      'Horas semanales teóricas; si no se envía, se asume todo el total como teoría',
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  theoreticalHours?: number;

  @ApiPropertyOptional({
    description: 'Horas semanales prácticas; por defecto 0',
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  practicalHours?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  semester!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  typeCurriculum!: number;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  department: IdCreateEntity;

  @ApiProperty({ type: [IdCreateEntity] })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  careers: IdCreateEntity[];
}
