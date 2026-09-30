import { normalizeText } from '../../common/text';
import { normalizeSubjectCode } from '../subject/subject-code';
import type { TeacherDegreeSummaryDto } from './dto/response-teacher-degree.dto';
import { GradeStatus } from './enum';

/** Datos de una nota que usan los cálculos del resumen. */
interface GradeFacts {
  code?: string;
  subjectName: string;
  period?: string;
  grade?: number;
  remark?: string;
  subject?: { id: number };
}

/** Nota con su estado e intento ya calculados. */
interface EvaluatedGrade extends GradeFacts {
  status?: GradeStatus;
  attempt: number;
}

/**
 * Estado de una asignatura: por el resultado escrito si lo hay (retirada, en
 * ejecución, aprobado, equivalencia...) o comparando la nota con la mínima
 * aprobatoria. `undefined` si no hay información suficiente.
 */
export function gradeStatus(
  grade: GradeFacts,
  minPassingGrade: number,
): GradeStatus | undefined {
  const remark = normalizeText(grade.remark ?? '');
  if (/retir|^rt\b/.test(remark)) return GradeStatus.Withdrawn;
  if (/ejecucion|en curso|cursando|inscrit/.test(remark)) {
    return GradeStatus.InProgress;
  }
  if (/reprob/.test(remark)) return GradeStatus.Failed;
  if (/aprob|equival|convalid|^ap\b/.test(remark)) return GradeStatus.Approved;
  if (grade.grade === null || grade.grade === undefined) return undefined;
  return grade.grade >= minPassingGrade
    ? GradeStatus.Approved
    : GradeStatus.Failed;
}

/**
 * Número de intento de cada nota en orden cronológico (1 = primera vez); la
 * asignatura se identifica por código o, sin código, por nombre.
 */
export function attemptNumbers(grades: GradeFacts[]): number[] {
  const order = grades
    .map((_, index) => index)
    .sort((a, b) =>
      (grades[a].period ?? '').localeCompare(grades[b].period ?? ''),
    );
  const seen = new Map<string, number>();
  const attempts: number[] = [];
  for (const index of order) {
    const key = subjectKey(grades[index]);
    seen.set(key, (seen.get(key) ?? 0) + 1);
    attempts[index] = seen.get(key);
  }
  return attempts;
}

/** Totales del título calculados a partir de sus notas y períodos. */
export function summarizeGrades(
  grades: EvaluatedGrade[],
  periodCodes: string[] = [],
): TeacherDegreeSummaryDto {
  const count = (status: GradeStatus) =>
    grades.filter((grade) => grade.status === status).length;
  const numeric = grades
    .filter((grade) => grade.status !== GradeStatus.Withdrawn)
    .map((grade) => grade.grade)
    .filter((grade) => typeof grade === 'number');
  const average =
    numeric.reduce((sum, grade) => sum + grade, 0) / numeric.length;
  return {
    periods: new Set([
      ...periodCodes,
      ...grades.map((grade) => grade.period).filter(Boolean),
    ]).size,
    subjects: new Set(grades.map(subjectKey)).size,
    approved: count(GradeStatus.Approved),
    failed: count(GradeStatus.Failed),
    withdrawn: count(GradeStatus.Withdrawn),
    inProgress: count(GradeStatus.InProgress),
    repeated: new Set(
      grades.filter((grade) => grade.attempt > 1).map(subjectKey),
    ).size,
    equivalences: grades.filter((grade) => grade.subject).length,
    gradeAverage: numeric.length ? Math.round(average * 100) / 100 : undefined,
  };
}

/** Identificador de la asignatura para detectar repeticiones: código o nombre normalizado. */
function subjectKey(grade: GradeFacts): string {
  return grade.code
    ? normalizeSubjectCode(grade.code)
    : normalizeText(grade.subjectName);
}
