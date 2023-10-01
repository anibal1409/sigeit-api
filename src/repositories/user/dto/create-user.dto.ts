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
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { User } from '../entities';
import { Roles } from '../enums';

export class CreateUserDto extends PartialType(
  OmitType(User, [
    'password',
    'updatedAt',
    'createdAt',
    'deleted',
    'teacher',
    'school',
    'department',
  ]),
) {
  @ApiProperty()
  @IsEmail()
  @Type(() => String)
  email!: Roles;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role!: Roles;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idDocument!: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsOptional()
  @Type(() => IdCreateEntity)
  teacher?: IdCreateEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty({ type: IdCreateEntity })
  @IsOptional()
  @Type(() => IdCreateEntity)
  school?: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsOptional()
  @Type(() => IdCreateEntity)
  department?: IdCreateEntity;
}
