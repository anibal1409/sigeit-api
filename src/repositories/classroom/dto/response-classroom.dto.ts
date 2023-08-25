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

import { Department } from '../../departament';
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
  departamentIds: Array<number>;

  @ApiProperty({ type: [Department] })
  @IsOptional()
  @Type(() => Department)
  departaments: Array<Department>;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  constructor(data: Classroom) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.departamentIds = data.departments.map((item) => item.department.id);
    this.departaments = data.departments.map((item) => item.department);
    this.type = data.type;
  }
}
