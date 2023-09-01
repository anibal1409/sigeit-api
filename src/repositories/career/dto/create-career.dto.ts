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
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { Department } from '../../department';
import { Career } from '../entities';

export class CreateCareerDto extends PartialType(
  OmitType(Career, ['updatedAt', 'createdAt', 'deleted'])
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
  @Type(() => Department)
  department!: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
