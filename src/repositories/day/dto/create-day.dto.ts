import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { Career } from '../../career/entities';

export class CreateDayDto extends PartialType(
  OmitType(Career, ['updatedAt', 'createdAt', 'deleted']),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  abbreviation!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;
}
