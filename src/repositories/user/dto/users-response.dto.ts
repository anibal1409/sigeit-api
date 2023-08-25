import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Department } from '../../departament';
import { School } from '../../school';
import { Teacher } from '../../teacher';
import { User } from '../entities';

export class UserRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  teacherId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Teacher)
  teacher: Teacher;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  schoolId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => School)
  school: School;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  departmentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department: Department;

  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.status = data.status;
    this.teacherId = data?.teacher?.id;
    this.teacher = data?.teacher;
    this.schoolId = data?.school?.id;
    this.school = data?.school;
    this.departmentId = data?.department?.id;
    this.department = data?.department;
  }
}
