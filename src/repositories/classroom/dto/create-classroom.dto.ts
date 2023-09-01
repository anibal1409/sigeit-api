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
import { Classroom } from '../entities';

export class CreateClassroomDto extends PartialType(
  OmitType(Classroom, ['updatedAt', 'createdAt', 'deleted'])
) {

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
  @Type(() => Department)
  departments: Department[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

}
