import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { School } from '../entities';

export class ResponseSchoolDto {
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
  @IsBoolean()
  status!: boolean;

  constructor(data: School) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.abbreviation = data.abbreviation;
    this.logo = data.logo;
    this.status = data.status;
  }
}
