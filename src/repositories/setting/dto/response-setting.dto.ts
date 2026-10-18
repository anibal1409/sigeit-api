import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Setting } from '../entities';

/** Configuración del instituto devuelta por la API. */
export class ResponseSettingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  instituteName: string;

  @ApiProperty()
  instituteAbbreviation: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ example: '07:00' })
  startTime: string;

  @ApiProperty({ example: '18:00' })
  endTime: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  interval: number;

  constructor(data: Setting) {
    this.id = data.id;
    this.instituteName = data.instituteName;
    this.instituteAbbreviation = data.instituteAbbreviation;
    this.description = data.description;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.duration = data.duration;
    this.interval = data.interval;
  }
}
