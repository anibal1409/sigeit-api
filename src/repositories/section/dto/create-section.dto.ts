import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { Section } from '../entities';

export class CreateSectionDto extends PartialType(
  OmitType(Section, ['updatedAt', 'createdAt', 'deleted'])
) {

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  subjectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  periodId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  teacherId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
