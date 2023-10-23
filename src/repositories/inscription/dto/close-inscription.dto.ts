import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsArray,
  IsNumber,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';

export class CloseInscriptionDto {
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids!: Array<number>;
}
