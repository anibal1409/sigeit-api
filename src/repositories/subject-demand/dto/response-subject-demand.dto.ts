import { ApiProperty } from '@nestjs/swagger';

import { SubjectDemand } from '../entities';

/** Demanda de una asignatura para un nivel de estudiante. */
export class ResponseSubjectDemandDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({ description: 'Nivel en el que se ubica el estudiante' })
  level!: number;

  @ApiProperty({ description: 'Estudiantes aptos para cursar la asignatura' })
  quantity!: number;

  @ApiProperty()
  subjectId!: number;

  @ApiProperty()
  subjectCode!: string;

  @ApiProperty()
  subjectName!: string;

  constructor(data: SubjectDemand) {
    this.id = data.id;
    this.level = data.level;
    this.quantity = data.quantity;
    this.subjectId = data.subject.id;
    this.subjectCode = data.subject.code;
    this.subjectName = data.subject.name;
  }
}
