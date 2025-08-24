import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { DocumentE } from '../entities';
import { TypeDocument } from '../enum';

export class CreateDocumentDto extends PartialType(
  OmitType(DocumentE, ['updatedAt', 'createdAt', 'deleted', 'department']),
) {
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

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  department: IdCreateEntity;
}
