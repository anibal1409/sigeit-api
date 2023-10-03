import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Career } from '../../career/entities';
import { Department } from '../../department/entities';
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
  typeCurriculum!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  departmentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @Type(() => Number)
  careerIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Career)
  careers: Career[];

  constructor(data: Subject) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.departmentId = data.department.id;
    this.department = data.department;
    this.status = data.status;
    this.careerIds = data.careers.map((item) => item.id);
    this.code = data.code;
    this.credits = data.credits;
    this.hours = data.hours;
    this.semester = data.semester;
    this.typeCurriculum = data.typeCurriculum;
    this.careers = data.careers;
  }
}
