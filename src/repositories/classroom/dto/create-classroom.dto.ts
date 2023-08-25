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
  @Type(() => Number)
  departmentIds: Array<number>;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

}
