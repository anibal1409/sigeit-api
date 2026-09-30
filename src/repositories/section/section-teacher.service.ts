import { In, Not, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { normalizeText } from '../../common/text';
import { realTeacherId } from '../schedule/schedule-time.util';
import { Subject } from '../subject/entities';
import { normalizeSubjectCode } from '../subject/subject-code';
import { ResponseTeacherDto } from '../teacher/dto/response-teacher.dto';
import { TeacherGradeMatchDto } from '../teacher/dto/search-teacher-grade.dto';
import { Teacher, TeacherGrade } from '../teacher/entities';
import { byPercentDesc, toGradeMatch } from '../teacher/grade-match';
import { GetSectionTeachersDto, ResponseSectionTeacherDto } from './dto';
import { Section } from './entities';

/** Palabras que no distinguen una asignatura de otra al buscar parecidas. */
const GENERIC_WORDS = new Set([
  'introduccion',
  'laboratorio',
  'taller',
  'seminario',
  'fundamentos',
  'principios',
  'general',
  'aplicada',
  'aplicadas',
  'especiales',
  'topicos',
]);

/** Veces que un profesor dictó la asignatura y el período más reciente. */
interface TaughtHistory {
  count: number;
  lastPeriodName: string;
}

/** Profesores para asignar a secciones: carga del período, historial y notas. */
@Injectable()
export class SectionTeacherService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(TeacherGrade)
    private readonly gradeRepository: Repository<TeacherGrade>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  /**
   * Profesores activos del departamento (sin comodines "por asignar") con su
   * carga en el período; con `subjectId` agrega cuántas veces dictaron la
   * asignatura y su mejor nota en ella o en una parecida, y ordena primero a
   * quienes la dictaron o tienen nota.
   */
  async findAll(
    periodId: number,
    query: GetSectionTeachersDto,
  ): Promise<ResponseSectionTeacherDto[]> {
    const subject = query.subjectId
      ? await this.findSubject(query.subjectId)
      : null;
    const teachers = await this.findTeachers(
      query.departmentId ?? subject?.department?.id,
    );
    if (!teachers.length) return [];

    const ids = teachers.map((teacher) => teacher.id);
    const [load, history, grades] = await Promise.all([
      this.loadByTeacher(periodId, ids),
      subject ? this.historyByTeacher(periodId, subject.id, ids) : null,
      subject ? this.gradesByTeacher(ids) : null,
    ]);
    const items = teachers.map(
      (teacher): ResponseSectionTeacherDto => ({
        teacher: new ResponseTeacherDto(teacher),
        hours: load.get(teacher.id)?.hours ?? 0,
        sections: load.get(teacher.id)?.sections ?? 0,
        ...(subject &&
          subjectFit(subject, history.get(teacher.id), grades.get(teacher.id))),
      }),
    );
    return subject ? items.sort(byRelevance) : items;
  }

  /** Asignatura vigente con su departamento; 404 si no existe. */
  private async findSubject(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id, deleted: false },
      relations: ['department'],
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  /** Profesores activos (opcionalmente de un departamento), sin los comodines "por asignar". */
  private async findTeachers(departmentId?: number): Promise<Teacher[]> {
    const teachers = await this.teacherRepository.find({
      where: {
        deleted: false,
        status: true,
        department: departmentId ? { id: departmentId } : undefined,
      },
      relations: ['department'],
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
    return teachers.filter((teacher) => realTeacherId(teacher));
  }

  /** Horas (según la asignatura) y cantidad de secciones activas por profesor en el período. */
  private async loadByTeacher(
    periodId: number,
    ids: number[],
  ): Promise<Map<number, { hours: number; sections: number }>> {
    const rows = await this.sectionRepository
      .createQueryBuilder('section')
      .innerJoin('section.subject', 'subject')
      .select('section.teacherId', 'teacherId')
      .addSelect('COALESCE(SUM(subject.hours), 0)', 'hours')
      .addSelect('COUNT(*)', 'sections')
      .where('section.periodId = :periodId', { periodId })
      .andWhere('section.deleted = false AND section.status = true')
      .andWhere('section.teacherId IN (:...ids)', { ids })
      .groupBy('section.teacherId')
      .getRawMany();
    return new Map(
      rows.map((row) => [
        Number(row.teacherId),
        { hours: Number(row.hours), sections: Number(row.sections) },
      ]),
    );
  }

  /** Períodos anteriores en que cada profesor dictó la asignatura y el más reciente. */
  private async historyByTeacher(
    periodId: number,
    subjectId: number,
    ids: number[],
  ): Promise<Map<number, TaughtHistory>> {
    const sections = await this.sectionRepository.find({
      where: {
        deleted: false,
        subject: { id: subjectId },
        teacher: { id: In(ids) },
        period: { id: Not(periodId) },
      },
      relations: ['teacher', 'period'],
      order: { period: { start: 'DESC' } },
    });
    const periods = new Map<number, Set<number>>();
    const result = new Map<number, TaughtHistory>();
    for (const section of sections) {
      const teacherId = section.teacher.id;
      const seen = periods.get(teacherId) ?? new Set<number>();
      seen.add(section.period.id);
      periods.set(teacherId, seen);
      result.set(teacherId, {
        count: seen.size,
        lastPeriodName:
          result.get(teacherId)?.lastPeriodName ?? section.period.name,
      });
    }
    return result;
  }

  /** Notas de los títulos vigentes de cada profesor. */
  private async gradesByTeacher(
    ids: number[],
  ): Promise<Map<number, TeacherGrade[]>> {
    const grades = await this.gradeRepository.find({
      where: { degree: { deleted: false, teacher: { id: In(ids) } } },
      relations: ['degree', 'degree.teacher', 'subject'],
    });
    const result = new Map<number, TeacherGrade[]>();
    for (const grade of grades) {
      const teacherId = grade.degree.teacher.id;
      result.set(teacherId, [...(result.get(teacherId) ?? []), grade]);
    }
    return result;
  }
}

/** Historial y mejores notas de un profesor respecto a la asignatura a asignar. */
function subjectFit(
  subject: Subject,
  taught: TaughtHistory | undefined,
  grades: TeacherGrade[] | undefined,
): Partial<ResponseSectionTeacherDto> {
  const { same, similar } = bestGrades(grades, subject);
  return {
    timesTaught: taught?.count ?? 0,
    lastPeriodName: taught?.lastPeriodName,
    grade: same,
    similarGrade: similar,
  };
}

/**
 * Orden de candidatos: primero quienes dictaron la asignatura o tienen nota en
 * ella (la nota parecida pesa menos), luego más veces dictada y mejor nota.
 */
function byRelevance(
  a: ResponseSectionTeacherDto,
  b: ResponseSectionTeacherDto,
): number {
  const relevance = (item: ResponseSectionTeacherDto) =>
    (item.timesTaught ? 2 : 0) + (item.grade ? 2 : item.similarGrade ? 1 : 0);
  return (
    relevance(b) - relevance(a) ||
    b.timesTaught - a.timesTaught ||
    byPercentDesc(a.grade ?? a.similarGrade, b.grade ?? b.similarGrade)
  );
}

/** Palabras del nombre que identifican la asignatura (4+ letras, no genéricas). */
function keyWords(normalizedName: string): string[] {
  return normalizedName
    .split(' ')
    .filter((word) => word.length >= 4 && !GENERIC_WORDS.has(word));
}

/**
 * Mejor nota en la misma asignatura (equivalencia indicada, mismo código o
 * mismo nombre) y en una parecida (comparte alguna palabra clave del nombre).
 * ponytail: parecido por palabras; usar pg_trgm si hace falta más precisión.
 */
export function bestGrades(
  grades: TeacherGrade[] | undefined,
  subject: Subject,
): { same?: TeacherGradeMatchDto; similar?: TeacherGradeMatchDto } {
  const code = normalizeSubjectCode(subject.code);
  const name = normalizeText(subject.name);
  const words = keyWords(name);
  const same: TeacherGrade[] = [];
  const similar: TeacherGrade[] = [];
  for (const grade of grades ?? []) {
    if (
      grade.subject?.id === subject.id ||
      (grade.code && normalizeSubjectCode(grade.code) === code) ||
      grade.normalizedName === name
    ) {
      same.push(grade);
    } else if (
      keyWords(grade.normalizedName).some((word) => words.includes(word))
    ) {
      similar.push(grade);
    }
  }
  return { same: best(same), similar: best(similar) };
}

/** La nota con mayor porcentaje de su escala (las que no tienen nota, al final). */
function best(grades: TeacherGrade[]): TeacherGradeMatchDto | undefined {
  return grades.map(toGradeMatch).sort(byPercentDesc)[0];
}
