import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiProperty } from '@nestjs/swagger';

import { Section } from '../../section/entities';
import { User } from '../../user/entities';
import { Inscription } from '../entities';
import { StageInscription } from '../enums';

export class ResponseInscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stage!: StageInscription;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  sectionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Section)
  section: Section;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => User)
  user: User;

  constructor(data: Inscription) {
    this.id = data.id;
    this.stage = data.stage as StageInscription;
    this.sectionId = data.section.id;
    this.section = data.section;
    this.userId = data.user.id;
    this.user = data.user;
  }
}
