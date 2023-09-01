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

import { Career } from '../../career/entities';
import { Classroom } from '../../classroom/entities';
import { Day } from '../../day/entities';
import { Period } from '../../period/entities';
import { Section } from '../../section/entities';

export class CreateScheduleDto extends PartialType(
  OmitType(Career, ['updatedAt', 'createdAt', 'deleted'])
) {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  end: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Classroom)
  classroom: Classroom;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Day)
  day: Day;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Section)
  section: Section;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Period)
  period: Period;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
