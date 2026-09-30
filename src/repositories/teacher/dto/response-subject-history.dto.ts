import { ApiProperty } from '@nestjs/swagger';

import { Section } from '../../section/entities';

/** Sección que el profesor impartió (o imparte) en un período. */
export class ResponseSubjectHistoryDto {
  @ApiProperty()
  sectionId!: number;

  @ApiProperty()
  sectionName!: string;

  @ApiProperty()
  periodId!: number;

  @ApiProperty()
  periodName!: string;

  @ApiProperty()
  subjectId!: number;

  @ApiProperty()
  subjectCode!: string;

  @ApiProperty()
  subjectName!: string;

  constructor(data: Section) {
    this.sectionId = data.id;
    this.sectionName = data.name;
    this.periodId = data.period.id;
    this.periodName = data.period.name;
    this.subjectId = data.subject.id;
    this.subjectCode = data.subject.code;
    this.subjectName = data.subject.name;
  }
}
