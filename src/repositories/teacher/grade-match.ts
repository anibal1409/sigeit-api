import { TeacherGradeMatchDto, toSubjectRef } from './dto';
import { TeacherGrade } from './entities';

/** Nota con su título y su porcentaje de la escala; requiere la relación `degree`. */
export function toGradeMatch(grade: TeacherGrade): TeacherGradeMatchDto {
  const { degree } = grade;
  const hasGrade = grade.grade !== null && grade.grade !== undefined;
  return {
    code: grade.code,
    subjectName: grade.subjectName,
    period: grade.period,
    grade: grade.grade,
    remark: grade.remark,
    maxGrade: degree.maxGrade,
    percent: hasGrade
      ? Math.round((grade.grade / degree.maxGrade) * 1000) / 10
      : undefined,
    degreeTitle: degree.title,
    degreeLevel: degree.level,
    subject: toSubjectRef(grade.subject),
  };
}

/** Comparador de mayor a menor porcentaje; las notas sin porcentaje van al final. */
export function byPercentDesc(
  a?: TeacherGradeMatchDto,
  b?: TeacherGradeMatchDto,
): number {
  return (b?.percent ?? -1) - (a?.percent ?? -1);
}
