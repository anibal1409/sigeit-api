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

import { Department } from '../../department';
import { School } from '../../school';
import { Teacher } from '../../teacher';
import { User } from '../entities';
import { Roles } from '../enums';

export class CreateUserDto extends PartialType(
  OmitType(User, ['password', 'updatedAt', 'createdAt', 'deleted']),
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
  @IsOptional()
  @Type(() => Teacher)
  teacher?: Teacher;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty()
  @IsOptional()
  @Type(() => School)
  school?: School;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department?: Department;
}
