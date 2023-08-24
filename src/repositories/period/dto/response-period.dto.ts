import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Period } from '../entities';
import { StagePeriod } from '../enum';

export class ResponsePeriodDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

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
  @IsDate()
  start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  end: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  end_time: string;

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
  status!: boolean;

  constructor(data: Period) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.duration = data.duration;
    this.start = data.start;
    this.end = data.end;
    this.start_time = data.start_time;
    this.end_time = data.end_time;
    this.interval = data.interval;
    this.stage = data.stage;
  }
}
