import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Department } from '../../department';
import { DocumentE } from '../entities';
import { TypeDocument } from '../enum';

export class ResponseDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type!: TypeDocument;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  departmentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  constructor(data: DocumentE) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.department = data.department;
    this.departmentId = data.department.id;
    this.type = data.type;
  }
}
