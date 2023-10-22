import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Career } from '../../../repositories/career';
import { Department } from '../../../repositories/department/entities';
import { School } from '../../../repositories/school/entities';
import { Teacher } from '../../../repositories/teacher/entities';

export class UserLoginDto {
  email: string;
  id: number;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  loginStamp: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => School)
  school: School;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsOptional()
  @Type(() => Teacher)
  teacher: Teacher;

  @ApiProperty()
  @IsOptional()
  @Type(() => Career)
  career: Career;
}
