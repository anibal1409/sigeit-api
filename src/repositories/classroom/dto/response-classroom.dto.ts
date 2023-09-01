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

import { Department } from '../../department';
import { Classroom } from '../entities';

export class ResponseClassroomDto {

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @Type(() => Number)
  departmentIds: Array<number>;

  @ApiProperty({ type: [Department] })
  @IsOptional()
  @Type(() => Department)
  departments: Array<Department>;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  constructor(data: Classroom) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.departmentIds = data.departments.map((item) => item.department.id);
    this.departments = data.departments.map((item) => item.department);
    this.type = data.type;
  }
}
