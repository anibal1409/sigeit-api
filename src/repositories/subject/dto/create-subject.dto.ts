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

import { Career } from '../../career';
import { Department } from '../../department';
import { Subject } from '../entities';

export class CreateSubjectDto extends PartialType(
  OmitType(Subject, ['updatedAt', 'createdAt', 'deleted'])
) {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  credits!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  hours!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  semester!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  type_curriculum!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Career)
  careers: Career[];

}
