import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { Subject } from '../../subject/entities';
import {
  attemptNumbers,
  gradeStatus,
  summarizeGrades,
} from '../degree-summary';
import { TeacherDegree, TeacherGrade } from '../entities';
import { GradeStatus } from '../enum';
import {
  CreateTeacherDegreeDto,
  pickDegreeFields,
  SubjectRefDto,
  TeacherGradeDto,
} from './create-teacher-degree.dto';

/** Nota guardada de un título, con su estado e intento calculados. */
export class ResponseTeacherGradeDto extends TeacherGradeDto {
  @ApiProperty()
  id!: number;

  @ApiPropertyOptional({
    enum: GradeStatus,
    enumName: 'GradeStatus',
    description:
      'Deducido de la nota (según la mínima aprobatoria) o del resultado',
  })
  status?: GradeStatus;

  @ApiProperty({
    description:
      'Vez que cursa la asignatura (1 = primera; 2 o más = repitencia)',
  })
  attempt!: number;

  constructor(data: TeacherGrade, status?: GradeStatus, attempt = 1) {
    super();
    this.id = data.id;
    this.code = data.code;
    this.subjectName = data.subjectName;
    this.period = data.period;
    this.grade = data.grade;
    this.remark = data.remark;
    this.credits = data.credits;
    this.makeup = data.makeup;
    this.subject = toSubjectRef(data.subject);
    this.status = status;
    this.attempt = attempt;
  }
}

/** Totales del título calculados a partir de sus notas. */
export class TeacherDegreeSummaryDto {
  @ApiProperty({ description: 'Períodos académicos cursados' })
  periods!: number;

  @ApiProperty({ description: 'Asignaturas distintas cursadas' })
  subjects!: number;

  @ApiProperty({ description: 'Notas aprobadas (incluye equivalencias)' })
  approved!: number;

  @ApiProperty()
  failed!: number;

  @ApiProperty()
  withdrawn!: number;

  @ApiProperty()
  inProgress!: number;

  @ApiProperty({ description: 'Asignaturas cursadas más de una vez' })
  repeated!: number;

  @ApiProperty({ description: 'Notas con asignatura equivalente del pensum' })
  equivalences!: number;

  @ApiPropertyOptional({
    description:
      'Promedio simple de las notas numéricas (sin retiros); el oficial está en `average`',
  })
  gradeAverage?: number;
}

/** Título de un profesor con sus notas y el resumen calculado. */
export class ResponseTeacherDegreeDto extends OmitType(CreateTeacherDegreeDto, [
  'teacher',
  'grades',
]) {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: [ResponseTeacherGradeDto] })
  grades!: ResponseTeacherGradeDto[];

  @ApiProperty({ type: TeacherDegreeSummaryDto })
  summary!: TeacherDegreeSummaryDto;

  constructor(data: TeacherDegree) {
    super();
    Object.assign(this, pickDegreeFields(data));
    this.id = data.id;
    const grades = data.grades ?? [];
    const minPassingGrade = data.minPassingGrade ?? data.maxGrade / 2;
    const attempts = attemptNumbers(grades);
    this.grades = grades.map(
      (grade, index) =>
        new ResponseTeacherGradeDto(
          grade,
          gradeStatus(grade, minPassingGrade),
          attempts[index],
        ),
    );
    this.summary = summarizeGrades(
      this.grades,
      (data.periods ?? []).map((period) => period.code),
    );
  }
}

/** Referencia informativa a una asignatura del pensum; `undefined` si no hay. */
export function toSubjectRef(subject?: Subject): SubjectRefDto | undefined {
  return subject
    ? { id: subject.id, code: subject.code, name: subject.name }
    : undefined;
}
