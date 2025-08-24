import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { School } from '../entities';

export class CreateSchoolDto extends PartialType(
  OmitType(School, ['updatedAt', 'createdAt', 'deleted']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

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
}
