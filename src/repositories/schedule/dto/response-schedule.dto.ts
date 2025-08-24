import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Classroom } from '../../classroom/entities';
import { Day } from '../../day/entities';
import { Period } from '../../period/entities';
import { Section } from '../../section/entities';
import { Schedule } from '../entities';

export class ResponseScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

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
  @IsOptional()
  @Type(() => Classroom)
  classroom: Classroom;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  dayId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Day)
  day: Day;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  sectionId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Section)
  section: Section;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  periodId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Period)
  period: Period;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  constructor(data: Schedule) {
    this.id = data.id;
    this.status = data.status;
    this.classroom = data.classroom;
    this.classroomId = data.classroom.id;
    this.day = data.day;
    this.dayId = data.day.id;
    this.section = data.section;
    this.sectionId = data.section.id;
    this.start = data.start;
    this.end = data.end;
    this.period = data.period;
    this.periodId = data.period.id;
  }
}
