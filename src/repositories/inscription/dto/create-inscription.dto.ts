import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base';
import { Inscription } from '../entities';
import { StageInscription } from '../enums';

export class CreateInscriptionDto extends PartialType(
  OmitType(Inscription, [
    'updatedAt',
    'createdAt',
    'deleted',
    'section',
    'user',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stage!: StageInscription;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  section!: IdCreateEntity;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  user!: IdCreateEntity;
}
