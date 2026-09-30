import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TeacherGradeDto } from './create-teacher-degree.dto';

/**
 * Datos extraídos de un récord de notas. No se guardan: el cliente los revisa y
 * los envía a `POST /teacher-degree` para confirmarlos.
 */
export class TranscriptPreviewDto {
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

  @ApiPropertyOptional({ example: 'Universidad de Oriente' })
  institution?: string;

  @ApiProperty({
    description:
      'Nota máxima de la escala: la del documento, o 10/20 según las notas si no la indica',
    example: 10,
  })
  maxGrade!: number;

  @ApiProperty({ type: [TeacherGradeDto] })
  grades!: TeacherGradeDto[];
}
