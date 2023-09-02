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

import { IdCreateEntity } from '../../base';
import { Classroom } from '../entities';

export class CreateClassroomDto extends PartialType(
  OmitType(Classroom, ['updatedAt', 'createdAt', 'deleted', 'departments'])
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

  @ApiProperty({ type: [IdCreateEntity] })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  departments: IdCreateEntity[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

}
