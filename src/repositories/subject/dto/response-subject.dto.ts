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
} from '@nestjs/swagger';

import { Career } from '../../career';
import { Department } from '../../departament';
import { Subject } from '../entities';

export class ResponseSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  credits!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  hours!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  semester!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  type_curriculum!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  departamentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  departament: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty({type: [Number]})
  @IsNotEmpty()
  @Type(() => Number)
  careerIds: number[];

  @ApiProperty({type: [Career]})
  @IsNotEmpty()
  @Type(() => Career)
  careers: Career[];

  constructor(data: Subject) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.departamentId = data.department.id;
    this.departament = data.department;
    this.status = data.status;
    this.careerIds = data.subjectCareer.map((item) => item.career.id);
    this.code = data.code;
    this.credits = data.credits;
    this.hours = data.hours;
    this.semester = data.semester;
    this.type_curriculum = data.type_curriculum;
    this.careers = data.subjectCareer.map((item) => item.career);
  }
}