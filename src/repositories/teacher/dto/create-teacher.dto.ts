import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
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

import { Career } from '../../career';
import { Department } from '../../department';

export class CreateTeacherDto extends PartialType(
  OmitType(Career, ['updatedAt', 'createdAt', 'deleted'])
) {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
