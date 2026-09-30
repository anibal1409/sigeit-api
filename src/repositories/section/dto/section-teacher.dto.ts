import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ResponseTeacherDto } from '../../teacher/dto/response-teacher.dto';
import { TeacherGradeMatchDto } from '../../teacher/dto/search-teacher-grade.dto';

/** Filtros de los profesores candidatos a las secciones de un período. */
export class GetSectionTeachersDto {
  @ApiPropertyOptional({
    description:
      'Departamento de los profesores; por defecto, el de la asignatura',
  })
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional({
    description:
      'Asignatura a asignar: agrega el historial y las notas de cada profesor en ella',
  })
  @IsOptional()
  @Type(() => Number)
  subjectId?: number;
}

/** Profesor candidato a una sección, con su carga en el período. */
export class ResponseSectionTeacherDto {
  @ApiProperty({ type: ResponseTeacherDto })
  teacher!: ResponseTeacherDto;

  @ApiProperty({
    description:
      'Horas semanales asignadas en el período (suma de las horas de la asignatura de cada sección activa)',
  })
  hours!: number;

  @ApiProperty({ description: 'Secciones activas asignadas en el período' })
  sections!: number;

  @ApiPropertyOptional({
    description: 'Períodos anteriores en que dictó la asignatura',
  })
  timesTaught?: number;

  @ApiPropertyOptional({
    description: 'Último período en que dictó la asignatura',
  })
  lastPeriodName?: string;

  @ApiPropertyOptional({
    type: TeacherGradeMatchDto,
    description:
      'Mejor nota en la misma asignatura (equivalencia indicada, mismo código o mismo nombre)',
  })
  grade?: TeacherGradeMatchDto;

  @ApiPropertyOptional({
    type: TeacherGradeMatchDto,
    description:
      'Mejor nota en una asignatura parecida (comparte una palabra clave del nombre)',
  })
  similarGrade?: TeacherGradeMatchDto;
}
