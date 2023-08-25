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

import { Career } from '../../career';

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
  @Type(() => Number)
  classroomId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  dayId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  sectionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  periodId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
