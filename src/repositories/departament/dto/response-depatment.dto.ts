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

import { School } from '../../school';
import { Department } from '../entities';

export class ResponseDepartmentDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  schoolId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => School)
  school: School;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  constructor(data: Department) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.abbreviation = data.abbreviation;
    this.logo = data.logo;
    this.schoolId = data.school.id;
    this.school = data.school;
    this.status = data.status;
  }
}