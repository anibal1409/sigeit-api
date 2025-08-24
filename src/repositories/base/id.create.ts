// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class IdCreateEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id!: number;
}
