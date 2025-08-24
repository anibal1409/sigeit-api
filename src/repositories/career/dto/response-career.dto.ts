import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Department } from '../../department/entities';
import { Career } from '../entities';

export class ResponseCareerDto {
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
  departmentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  constructor(data: Career) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.abbreviation = data.abbreviation;
    this.logo = data.logo;
    this.departmentId = data.department.id;
    this.department = data.department;
    this.status = data.status;
  }
}
