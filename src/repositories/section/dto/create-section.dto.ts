import { Type } from 'class-transformer';
import {
  IsBoolean,
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
import { Section } from '../entities';

export class CreateSectionDto extends PartialType(
  OmitType(Section, [
    'updatedAt',
    'createdAt',
    'deleted',
    'subject',
    'teacher',
    'period',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  subject: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  period: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  teacher: IdCreateEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  all?: boolean;
}
