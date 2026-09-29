import { In, Repository } from 'typeorm';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Period } from '../period/entities';
import { Section } from '../section/entities';
import { SubjectDemand } from '../subject-demand/entities';
import { DayConflictsDto, ScheduleConflictsDto, ScheduleLiteDto } from './dto';
import { Schedule } from './entities';
import {
  ConflictContext,
  findOverlaps,
  isValidRange,
  isWithinPeriod,
  peakLevel,
  periodLimit,
  realTeacherId,
  TimeRange,
} from './schedule-time.util';

/** Bloque que se quiere guardar. */
export interface ScheduleCandidate extends TimeRange {
  periodId: number;
  dayId: number;
  classroomId: number;
  sectionId: number;
  /** Horario en edición, que no debe chocar consigo mismo. */
  excludeId?: number;
}

/**
 * Detecta choques de aula, profesor y nivel entre bloques de un período y
 * valida los horarios antes de guardarlos.
 */
@Injectable()
export class ScheduleConflictService {
  constructor(
    @InjectRepository(Schedule)
    private schedules: Repository<Schedule>,
    @InjectRepository(Period)
    private periods: Repository<Period>,
    @InjectRepository(Section)
    private sections: Repository<Section>,
    @InjectRepository(SubjectDemand)
    private demands: Repository<SubjectDemand>,
  ) {}

  /** Choques de un bloque candidato, sin lanzar errores por ellos. */
  async findConflicts(
    candidate: ScheduleCandidate,
  ): Promise<ScheduleConflictsDto> {
    const [period, section, schedules] = await Promise.all([
      this.findPeriod(candidate.periodId),
      this.findSection(candidate.sectionId),
      this.findPeriodSchedules(candidate.periodId, [candidate.dayId]),
    ]);
    const peaks = await this.findPeakLevels(period);
    return this.classify(candidate, schedules, this.contextOf(section, peaks));
  }

  /**
   * Valida horas, franja del período y pertenencia de la sección. Sin `force`,
   * responde 409 con el detalle por día si hay choques de aula o profesor.
   * Todos los candidatos comparten sección, período y horas (varían los días).
   */
  async assertSchedulable(
    candidates: ScheduleCandidate[],
    force = false,
  ): Promise<void> {
    const [first] = candidates;
    if (!isValidRange(first)) {
      throw new BadRequestException(
        'Las horas deben tener formato HH:mm y el inicio debe ser anterior al fin.',
      );
    }
    const [period, section] = await Promise.all([
      this.findPeriod(first.periodId),
      this.findSection(first.sectionId),
    ]);
    if (!isWithinPeriod(first, period)) {
      throw new BadRequestException(
        `El bloque debe estar entre ${period.startTime} y ${periodLimit(period)}.`,
      );
    }
    if (section.period?.id !== period.id) {
      throw new BadRequestException('La sección no pertenece al período.');
    }
    if (force) return;
    await this.assertNoBlockingConflicts(candidates, section);
  }

  /** Período vigente (no eliminado) o 404. */
  async findPeriod(id: number): Promise<Period> {
    const period = await this.periods.findOne({
      where: { id, deleted: false },
    });
    if (!period) throw new NotFoundException('Period not found');
    return period;
  }

  /** Sección con período, asignatura (y departamento) y profesor, o 404. */
  async findSection(id: number): Promise<Section> {
    const section = await this.sections.findOne({
      where: { id, deleted: false },
      relations: ['period', 'subject', 'subject.department', 'teacher'],
    });
    if (!section) throw new NotFoundException('Section not found');
    return section;
  }

  /** Horarios vigentes del período (opcionalmente de algunos días) con lo necesario para evaluar choques. */
  findPeriodSchedules(
    periodId: number,
    dayIds?: number[],
  ): Promise<Schedule[]> {
    return this.schedules.find({
      where: {
        deleted: false,
        period: { id: periodId },
        day: dayIds && { id: In(dayIds) },
      },
      relations: [
        'day',
        'classroom',
        'section',
        'section.subject',
        'section.subject.department',
        'section.teacher',
      ],
      order: { day: { id: 'ASC' }, start: 'ASC' },
    });
  }

  /**
   * Nivel pico por asignatura. Usa la demanda del período o, si no tiene, la
   * del período anterior más reciente con demanda (misma regla que el frontend).
   */
  async findPeakLevels(
    period: Pick<Period, 'id' | 'start'>,
  ): Promise<Map<number, number>> {
    const rows: Array<{ subjectId: number; level: number; quantity: string }> =
      await this.demands.query(
        `SELECT d."subjectId", d.level, SUM(d.quantity) AS quantity
           FROM subject_demand d
          WHERE NOT d.deleted AND d."periodId" = (
            SELECT sd."periodId" FROM subject_demand sd
              JOIN period p ON p.id = sd."periodId"
             WHERE NOT sd.deleted AND NOT p.deleted AND p.start <= $2
             ORDER BY (p.id = $1) DESC, p.start DESC
             LIMIT 1)
          GROUP BY d."subjectId", d.level`,
        [period.id, period.start],
      );
    const bySubject = new Map<number, Map<number, number>>();
    rows.forEach((row) => {
      const byLevel = bySubject.get(row.subjectId) ?? new Map<number, number>();
      byLevel.set(row.level, Number(row.quantity));
      bySubject.set(row.subjectId, byLevel);
    });
    return new Map(
      [...bySubject].map(([subjectId, byLevel]) => [
        subjectId,
        peakLevel(byLevel),
      ]),
    );
  }

  /** Contexto de choques de una sección (requiere subject y teacher cargados). */
  contextOf(section: Section, peaks: Map<number, number>): ConflictContext {
    return {
      sectionId: section.id,
      subjectId: section.subject.id,
      teacherId: realTeacherId(section.teacher),
      peakLevel: peaks.get(section.subject.id) ?? 0,
      peaks,
    };
  }

  /** Lanza 409 con los choques bloqueantes de cada día, si los hay. */
  private async assertNoBlockingConflicts(
    candidates: ScheduleCandidate[],
    section: Section,
  ): Promise<void> {
    const [schedules, peaks] = await Promise.all([
      this.findPeriodSchedules(
        section.period.id,
        candidates.map(({ dayId }) => dayId),
      ),
      this.findPeakLevels(section.period),
    ]);
    const context = this.contextOf(section, peaks);
    const conflicts: DayConflictsDto[] = candidates
      .map((candidate) => ({
        dayId: candidate.dayId,
        ...this.classify(candidate, schedules, context),
      }))
      .filter((day) => day.blocking);
    if (conflicts.length) {
      throw new ConflictException({
        statusCode: 409,
        message: 'El horario choca con otros bloques de aula o profesor.',
        conflicts,
      });
    }
  }

  /** Clasifica los choques del candidato contra los horarios del período. */
  private classify(
    candidate: ScheduleCandidate,
    schedules: Schedule[],
    context: ConflictContext,
  ): ScheduleConflictsDto {
    const sameDay = schedules.filter(
      (item) =>
        item.day.id === candidate.dayId && item.id !== candidate.excludeId,
    );
    const found = findOverlaps(candidate, sameDay, context);
    const classroom = found.classroom.filter(
      (item) => item.classroom.id === candidate.classroomId,
    );
    const toLite = (items: Schedule[]) =>
      items.map((item) => new ScheduleLiteDto(item));
    return {
      blocking: classroom.length > 0 || found.teacher.length > 0,
      peakLevel: context.peakLevel,
      classroom: toLite(classroom),
      teacher: toLite(found.teacher),
      level: toLite(found.level),
    };
  }
}
