import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
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

import { IdCreateEntity } from '../../base';
import { Schedule } from '../entities';

export class CreateScheduleDto extends PartialType(
  OmitType(Schedule, [
    'updatedAt',
    'createdAt',
    'deleted',
    'classroom',
    'day',
    'section',
    'period',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  end: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  classroom: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  day: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  section: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  period: IdCreateEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Guarda aunque existan choques de aula o profesor',
  })
  @IsOptional()
  @IsBoolean()
  force?: boolean;
}

/** Mismo bloque repetido en varios días; se guarda todo o nada. */
export class CreateSchedulesBulkDto extends OmitType(CreateScheduleDto, [
  'day',
] as const) {
  @ApiProperty({
    type: [Number],
    description: 'Días en los que se repite el bloque',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  dayIds: number[];
}
