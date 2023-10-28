import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
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
  OmitType(Period, ['updatedAt', 'createdAt', 'deleted'])
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

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  copyPrevious!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
