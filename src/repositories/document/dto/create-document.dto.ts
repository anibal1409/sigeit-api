import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { TypeDocument } from '../enum';

/** Datos para crear un formato de documento. */
export class CreateDocumentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ enum: TypeDocument, enumName: 'TypeDocument' })
  @IsEnum(TypeDocument)
  type!: TypeDocument;

  @ApiProperty({
    description: 'Cuerpo con variables; carga académica exige {tabla}',
  })
  @IsString()
  @MaxLength(5000)
  body!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  signature!: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => IdCreateEntity)
  department!: IdCreateEntity;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
