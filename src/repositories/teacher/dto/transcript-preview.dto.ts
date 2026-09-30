import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import {
  CreateTeacherDegreeDto,
  TeacherGradeDto,
} from './create-teacher-degree.dto';

/**
 * Datos extraídos de un récord de notas. No se guardan: el cliente los revisa,
 * elige el nivel y los envía a `POST /teacher-degree` para confirmarlos.
 */
export class TranscriptPreviewDto extends OmitType(CreateTeacherDegreeDto, [
  'teacher',
  'level',
  'title',
  'maxGrade',
  'grades',
]) {
  @ApiPropertyOptional({
    description: 'Cédula del estudiante, solo dígitos',
    example: '23539583',
  })
  idDocument?: string;

  @ApiPropertyOptional({ example: 'FARIÑAS BARRERA, ANIBAL ANTONIO' })
  studentName?: string;

  @ApiPropertyOptional({
    description: 'Carrera o programa',
    example: 'Ingeniería de Sistemas',
  })
  title?: string;

  @ApiProperty({
    description:
      'Nota máxima de la escala: la del documento, o 10/20 según las notas si no la indica',
    example: 10,
  })
  maxGrade!: number;

  @ApiProperty({ type: [TeacherGradeDto] })
  grades!: TeacherGradeDto[];
}
