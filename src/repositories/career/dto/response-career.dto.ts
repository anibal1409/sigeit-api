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
  departamentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  departament: Department;

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
    this.departamentId = data.department.id;
    this.departament = data.department;
    this.status = data.status;
  }
}
