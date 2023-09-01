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

import { Period } from '../../period';
import { Subject } from '../../subject/entities';
import { Teacher } from '../../teacher';
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
  @Type(() => Subject)
  subject: Subject;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Period)
  period: Period;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Teacher)
  teacher: Teacher;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
