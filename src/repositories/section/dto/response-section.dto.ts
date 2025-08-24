import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Period } from '../../period/entities';
import { Subject } from '../../subject/entities';
import { Teacher } from '../../teacher/entities';
import { Section } from '../entities';

export class ResponseSectionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  inscribed: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  subjectId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Subject)
  subject: Subject;

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
  @Type(() => Number)
  teacherId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Teacher)
  teacher: Teacher;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  all!: boolean;

  constructor(data: Section) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.capacity = data.capacity;
    this.subjectId = data.subject.id;
    this.subject = data.subject;
    this.periodId = data.period.id;
    this.period = data.period;
    this.teacherId = data.teacher.id;
    this.teacher = data.teacher;
    this.inscribed = data.inscribed;
    this.all = data.all;
  }
}
