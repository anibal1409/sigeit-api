import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Classroom } from '../classroom/entities';
import { Day } from '../day/entities';
import { Period } from '../period/entities';
import { Section } from '../section/entities';
import {
  ConflictPairDto,
  CoverageStatus,
  FreeSlotDto,
  FreeSlotsQueryDto,
  PeriodAuditDto,
  PlanningPeriodQueryDto,
  ScheduleLiteDto,
  SectionCoverageDto,
} from './dto';
import { Schedule } from './entities';
import { ScheduleConflictService } from './schedule-conflict.service';
import {
  academicHours,
  ConflictContext,
  consecutiveBlocks,
  findOverlaps,
  isValidRange,
  isWithinPeriod,
  periodSlots,
  teacherName,
  TimeRange,
} from './schedule-time.util';

/** Choques entre horarios existentes, por tipo. */
type ConflictPairs = Pick<PeriodAuditDto, 'classroom' | 'teacher' | 'level'>;

/** Herramientas de planificación: bloques libres, cobertura de horas y auditoría. */
@Injectable()
export class SchedulePlanningService {
  constructor(
    private conflictService: ScheduleConflictService,
    @InjectRepository(Section)
    private sections: Repository<Section>,
    @InjectRepository(Day)
    private days: Repository<Day>,
    @InjectRepository(Classroom)
    private classrooms: Repository<Classroom>,
  ) {}

  /**
   * Bloques de la grilla del período donde la sección puede programarse sin
   * choque de profesor, con las aulas libres en cada uno.
   */
  async findFreeSlots(query: FreeSlotsQueryDto): Promise<FreeSlotDto[]> {
    const [period, section] = await Promise.all([
      this.conflictService.findPeriod(query.periodId),
      this.conflictService.findSection(query.sectionId),
    ]);
    const [schedules, peaks, days, classrooms] = await Promise.all([
      this.conflictService.findPeriodSchedules(
        period.id,
        query.dayId ? [query.dayId] : undefined,
      ),
      this.conflictService.findPeakLevels(period),
      this.days.find({
        where: { deleted: false, id: query.dayId },
        order: { id: 'ASC' },
      }),
      this.findClassrooms(section, query.allClassrooms),
    ]);
    const context = this.conflictService.contextOf(section, peaks);
    const others = schedules.filter((item) => item.id !== query.excludeId);
    const blocks = consecutiveBlocks(periodSlots(period), query.hours || 1);
    return days.flatMap((day) => {
      const daySchedules = others.filter((item) => item.day.id === day.id);
      return blocks
        .map((block) =>
          this.freeSlot(day, block, daySchedules, classrooms, context),
        )
        .filter((slot): slot is FreeSlotDto => slot !== null);
    });
  }

  /** Horas académicas programadas de cada sección del período frente a las de su asignatura. */
  async findHoursCoverage(
    query: PlanningPeriodQueryDto,
  ): Promise<SectionCoverageDto[]> {
    const period = await this.conflictService.findPeriod(query.periodId);
    const schedules = await this.conflictService.findPeriodSchedules(period.id);
    return this.coverage(period, schedules, query.departmentId);
  }

  /**
   * Revisión completa del período: choques de aula, profesor y nivel entre
   * horarios guardados, bloques fuera de franja y secciones con horas incompletas.
   */
  async audit(query: PlanningPeriodQueryDto): Promise<PeriodAuditDto> {
    const period = await this.conflictService.findPeriod(query.periodId);
    const [all, peaks] = await Promise.all([
      this.conflictService.findPeriodSchedules(period.id),
      this.conflictService.findPeakLevels(period),
    ]);
    const inDepartment = (item: Schedule) =>
      !query.departmentId ||
      item.section.subject.department?.id === query.departmentId;
    const pairs = this.conflictPairs(
      all.filter(isValidRange),
      peaks,
      inDepartment,
    );
    const outOfRange = all
      .filter((item) => inDepartment(item) && !isWithinPeriod(item, period))
      .map((item) => new ScheduleLiteDto(item));
    const incompleteSections = (
      await this.coverage(period, all, query.departmentId)
    ).filter((item) => item.status !== CoverageStatus.Complete);
    return {
      summary: {
        classroom: pairs.classroom.length,
        teacher: pairs.teacher.length,
        level: pairs.level.length,
        outOfRange: outOfRange.length,
        incompleteSections: incompleteSections.length,
      },
      ...pairs,
      outOfRange,
      incompleteSections,
    };
  }

  /** Bloque libre para la sección, o null si su profesor está ocupado o no hay aulas. */
  private freeSlot(
    day: Day,
    block: TimeRange,
    schedules: Schedule[],
    classrooms: Classroom[],
    context: ConflictContext,
  ): FreeSlotDto | null {
    const found = findOverlaps(block, schedules, context);
    if (found.teacher.length) return null;
    const busy = new Set(found.classroom.map((item) => item.classroom.id));
    const free = classrooms.filter((classroom) => !busy.has(classroom.id));
    if (!free.length) return null;
    return {
      dayId: day.id,
      dayName: day.name,
      start: block.start,
      end: block.end,
      levelConflict: found.level.length > 0,
      classrooms: free.map(({ id, name, type }) => ({ id, name, type })),
    };
  }

  /** Aulas activas del departamento de la asignatura, o todas si se pide. */
  private findClassrooms(
    section: Section,
    all?: boolean,
  ): Promise<Classroom[]> {
    const department = section.subject.department?.id;
    return this.classrooms.find({
      where: {
        deleted: false,
        status: true,
        ...(!all && department && { departments: { id: department } }),
      },
      order: { name: 'ASC' },
    });
  }

  /** Cobertura de horas por sección a partir de los horarios ya cargados del período. */
  private async coverage(
    period: Period,
    schedules: Schedule[],
    departmentId?: number,
  ): Promise<SectionCoverageDto[]> {
    const sections = await this.sections.find({
      where: {
        deleted: false,
        period: { id: period.id },
        ...(departmentId && { subject: { department: { id: departmentId } } }),
      },
      relations: ['subject', 'teacher'],
      order: { subject: { semester: 'ASC', name: 'ASC' }, name: 'ASC' },
    });
    const assigned = new Map<number, number>();
    schedules.filter(isValidRange).forEach((item) => {
      const hours = academicHours(item, period.duration);
      assigned.set(
        item.section.id,
        (assigned.get(item.section.id) ?? 0) + hours,
      );
    });
    return sections.map((section) =>
      toCoverage(section, assigned.get(section.id) ?? 0),
    );
  }

  /**
   * Pares de horarios que chocan el mismo día. Un par cuenta si al menos uno
   * de los dos pertenece al departamento filtrado.
   */
  // ponytail: comparación O(n²) por período; suficiente para cientos de bloques, indexar por día si crece.
  private conflictPairs(
    schedules: Schedule[],
    peaks: Map<number, number>,
    inDepartment: (item: Schedule) => boolean,
  ): ConflictPairs {
    const pairs: ConflictPairs = { classroom: [], teacher: [], level: [] };
    const toPair =
      (first: Schedule) =>
      (second: Schedule): ConflictPairDto => ({
        first: new ScheduleLiteDto(first),
        second: new ScheduleLiteDto(second),
      });
    schedules.forEach((item, index) => {
      const later = schedules
        .slice(index + 1)
        .filter(
          (other) =>
            other.day.id === item.day.id &&
            (inDepartment(item) || inDepartment(other)),
        );
      const found = findOverlaps(
        item,
        later,
        this.conflictService.contextOf(item.section, peaks),
      );
      const pair = toPair(item);
      pairs.classroom.push(
        ...found.classroom
          .filter((other) => other.classroom.id === item.classroom.id)
          .map(pair),
      );
      pairs.teacher.push(...found.teacher.map(pair));
      pairs.level.push(...found.level.map(pair));
    });
    return pairs;
  }
}

/** Estado de cobertura de una sección según sus horas asignadas. */
function toCoverage(
  section: Section,
  assignedHours: number,
): SectionCoverageDto {
  const requiredHours = section.subject.hours;
  const status =
    assignedHours === 0
      ? CoverageStatus.Empty
      : assignedHours < requiredHours
        ? CoverageStatus.Incomplete
        : assignedHours === requiredHours
          ? CoverageStatus.Complete
          : CoverageStatus.Exceeded;
  return {
    sectionId: section.id,
    sectionName: section.name,
    subjectId: section.subject.id,
    subjectCode: section.subject.code,
    subjectName: section.subject.name,
    semester: section.subject.semester,
    teacherName: teacherName(section.teacher),
    requiredHours,
    assignedHours,
    status,
  };
}
