import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Classroom } from '../classroom/entities';
import { Period } from '../period/entities';
import { Schedule } from '../schedule/entities';
import { Section } from '../section/entities';
import { Subject } from '../subject/entities';
import {
  CareerSectionStatItemDto,
  ClassroomUsageItemDto,
  CurriculumSemesterStatItemDto,
  DepartmentStatItemDto,
  PeriodComparisonDeltaDto,
  PeriodComparisonResponseDto,
  PeriodMetricResponseDto,
  SectionOpenDistributionItemDto,
  StartTimeSlotItemDto,
  SubjectStatItemDto,
  SubjectDemandIncreaseItemDto,
  TeacherWorkloadItemDto,
  TeachersByDayItemDto,
  TeachersByDayResponseDto,
  TimelineItemDto,
} from './dto';

/** Agregaciones para dashboards; excluye datos de inscripciones. */
@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepo: Repository<Section>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
    @InjectRepository(Period)
    private readonly periodRepo: Repository<Period>,
  ) {}

  /**
   * Compara períodos: secciones, cupo total y horas-materia ofertadas,
   * más deltas respecto al primero de la lista.
   */
  async getPeriodComparison(
    periodIds: number[],
  ): Promise<PeriodComparisonResponseDto> {
    const ordered = await this.loadPeriodsInOrder(periodIds);
    const metrics = await Promise.all(
      ordered.map((p) => this.metricForPeriod(p)),
    );
    return {
      metrics,
      deltasFromFirst: this.buildDeltasFromFirst(metrics),
      subjectDemandIncreases: await this.subjectDemandIncreases(
        ordered[0].id,
        ordered[ordered.length - 1].id,
      ),
    };
  }

  /** Profesores distintos con clase por día (según planificación). */
  async getTeachersByDay(periodId: number): Promise<TeachersByDayResponseDto> {
    await this.ensurePeriodExists(periodId);
    const rows = await this.scheduleRepo
      .createQueryBuilder('sch')
      .innerJoin('sch.section', 'sec', 'sec.deleted = :df', { df: false })
      .innerJoin('sch.day', 'day')
      .where('sch.periodId = :pid', { pid: periodId })
      .andWhere('sch.deleted = :df', { df: false })
      .select('day.id', 'dayId')
      .addSelect('day.name', 'dayName')
      .addSelect('day.abbreviation', 'dayAbbreviation')
      .addSelect('COUNT(DISTINCT sec.teacherId)', 'teacherCount')
      .groupBy('day.id')
      .addGroupBy('day.name')
      .addGroupBy('day.abbreviation')
      .orderBy('day.id', 'ASC')
      .getRawMany();
    const items: TeachersByDayItemDto[] = rows.map((r) => ({
      dayId: Number(r.dayId),
      dayName: r.dayName,
      dayAbbreviation: r.dayAbbreviation,
      teacherCount: Number(r.teacherCount),
    }));
    return { items };
  }

  /** Secciones y cupo por departamento (vía materia). */
  async getByDepartment(periodId: number): Promise<DepartmentStatItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const rows = await this.sectionRepo
      .createQueryBuilder('sec')
      .innerJoin('sec.subject', 'sub')
      .innerJoin('sub.department', 'dep')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .andWhere('dep.deleted = :df', { df: false })
      .select('dep.id', 'departmentId')
      .addSelect('dep.name', 'departmentName')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sec.capacity), 0)', 'totalCapacity')
      .groupBy('dep.id')
      .addGroupBy('dep.name')
      .orderBy('dep.name', 'ASC')
      .getRawMany();
    return rows.map((r) => ({
      departmentId: Number(r.departmentId),
      departmentName: r.departmentName,
      sectionCount: Number(r.sectionCount),
      totalCapacity: Number(r.totalCapacity),
    }));
  }

  /** Secciones y cupo por materia. */
  async getBySubject(periodId: number): Promise<SubjectStatItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const rows = await this.sectionRepo
      .createQueryBuilder('sec')
      .innerJoin('sec.subject', 'sub')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .andWhere('sub.deleted = :df', { df: false })
      .select('sub.id', 'subjectId')
      .addSelect('sub.code', 'subjectCode')
      .addSelect('sub.name', 'subjectName')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sec.capacity), 0)', 'totalCapacity')
      .groupBy('sub.id')
      .addGroupBy('sub.code')
      .addGroupBy('sub.name')
      .orderBy('sub.code', 'ASC')
      .getRawMany();
    return rows.map((r) => ({
      subjectId: Number(r.subjectId),
      subjectCode: r.subjectCode,
      subjectName: r.subjectName,
      sectionCount: Number(r.sectionCount),
      totalCapacity: Number(r.totalCapacity),
    }));
  }

  /** Carga docente: secciones, bloques en horario y horas-materia. */
  async getTeacherWorkload(periodId: number): Promise<TeacherWorkloadItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const secRows = await this.sectionWorkloadRows(periodId);
    const blockMap = await this.scheduleBlocksByTeacher(periodId);
    return secRows.map((r) => ({
      teacherId: r.teacherId,
      firstName: r.firstName,
      lastName: r.lastName ?? null,
      sectionCount: r.sectionCount,
      scheduleBlockCount: blockMap.get(r.teacherId) ?? 0,
      totalSubjectHours: r.totalSubjectHours,
    }));
  }

  /** Uso de aulas: cantidad de bloques planificados por salón. */
  async getClassroomUsage(
    periodId: number,
    classroomId?: number,
  ): Promise<ClassroomUsageItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const schedules = await this.scheduleRepo.find({
      where: {
        deleted: false,
        period: { id: periodId },
      },
      relations: {
        classroom: true,
      },
    });
    const map = new Map<number, ClassroomUsageItemDto>();
    for (const schedule of schedules) {
      const room = schedule.classroom;
      if (!room || (classroomId != null && room.id !== classroomId)) {
        continue;
      }
      const current = map.get(room.id) ?? {
        classroomId: room.id,
        classroomName: room.name,
        scheduleBlockCount: 0,
      };
      current.scheduleBlockCount += 1;
      map.set(room.id, current);
    }
    return [...map.values()].sort((a, b) => b.scheduleBlockCount - a.scheduleBlockCount);
  }

  /** Distribución de bloques por hora de inicio (picos de planificación). */
  async getStartTimeDistribution(
    periodId: number,
    classroomId?: number,
  ): Promise<StartTimeSlotItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const qb = this.scheduleRepo
      .createQueryBuilder('sch')
      .where('sch.periodId = :pid', { pid: periodId })
      .andWhere('sch.deleted = :df', { df: false })
      .select('sch.start', 'startTime')
      .addSelect('COUNT(sch.id)', 'blockCount')
      .groupBy('sch.start')
      .orderBy('sch.start', 'ASC');
    if (classroomId != null) {
      qb.andWhere('sch.classroomId = :cid', { cid: classroomId });
    }
    const rows = await qb.getRawMany();
    return rows.map((r) => ({
      startTime: r.startTime,
      blockCount: Number(r.blockCount),
    }));
  }

  /** Secciones abiertas a todas las carreras vs restringidas. */
  async getSectionOpenDistribution(
    periodId: number,
  ): Promise<SectionOpenDistributionItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const rows = await this.sectionRepo
      .createQueryBuilder('sec')
      .select('sec.all', 'openToAll')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .groupBy('sec.all')
      .getRawMany();
    return rows.map((r) => ({
      openToAll: Boolean(r.openToAll),
      sectionCount: Number(r.sectionCount),
    }));
  }

  /** Evolución histórica por período (orden cronológico). */
  async getTimeline(): Promise<TimelineItemDto[]> {
    const rows = await this.periodRepo
      .createQueryBuilder('p')
      .leftJoin(
        Section,
        'sec',
        'sec.periodId = p.id AND sec.deleted = :df',
        { df: false },
      )
      .leftJoin(Subject, 'sub', 'sub.id = sec.subjectId')
      .where('p.deleted = :df', { df: false })
      .select('p.id', 'periodId')
      .addSelect('p.name', 'periodName')
      .addSelect('p.start', 'periodStart')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sec.capacity), 0)', 'totalCapacity')
      .addSelect('COALESCE(SUM(sub.hours), 0)', 'totalSubjectHours')
      .groupBy('p.id')
      .addGroupBy('p.name')
      .addGroupBy('p.start')
      .orderBy('p.start', 'ASC')
      .getRawMany();
    return rows.map((r) => ({
      periodId: Number(r.periodId),
      periodName: r.periodName,
      periodStart: new Date(r.periodStart).toISOString(),
      sectionCount: Number(r.sectionCount),
      totalCapacity: Number(r.totalCapacity),
      totalSubjectHours: Number(r.totalSubjectHours),
    }));
  }

  /**
   * Secciones por carrera (materia vinculada vía M2M; una sección puede
   * contar en varias carreras).
   */
  async getByCareer(periodId: number): Promise<CareerSectionStatItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const rows = await this.sectionRepo
      .createQueryBuilder('sec')
      .innerJoin('sec.subject', 'sub')
      .innerJoin('sub.careers', 'car')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .andWhere('sub.deleted = :df', { df: false })
      .andWhere('car.deleted = :df', { df: false })
      .select('car.id', 'careerId')
      .addSelect('car.name', 'careerName')
      .addSelect('car.abbreviation', 'careerAbbreviation')
      .addSelect('COUNT(DISTINCT sec.id)', 'sectionCount')
      .groupBy('car.id')
      .addGroupBy('car.name')
      .addGroupBy('car.abbreviation')
      .orderBy('car.name', 'ASC')
      .getRawMany();
    return rows.map((r) => ({
      careerId: Number(r.careerId),
      careerName: r.careerName,
      careerAbbreviation: r.careerAbbreviation,
      sectionCount: Number(r.sectionCount),
    }));
  }

  /** Oferta por semestre del pensum (campo semester de la materia). */
  async getByCurriculumSemester(
    periodId: number,
  ): Promise<CurriculumSemesterStatItemDto[]> {
    await this.ensurePeriodExists(periodId);
    const rows = await this.sectionRepo
      .createQueryBuilder('sec')
      .innerJoin('sec.subject', 'sub')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .andWhere('sub.deleted = :df', { df: false })
      .select('sub.semester', 'curriculumSemester')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sec.capacity), 0)', 'totalCapacity')
      .groupBy('sub.semester')
      .orderBy('sub.semester', 'ASC')
      .getRawMany();
    return rows.map((r) => ({
      curriculumSemester: Number(r.curriculumSemester),
      sectionCount: Number(r.sectionCount),
      totalCapacity: Number(r.totalCapacity),
    }));
  }

  private async ensurePeriodExists(periodId: number): Promise<void> {
    const n = await this.periodRepo.count({
      where: { id: periodId, deleted: false },
    });
    if (n === 0) {
      throw new NotFoundException(`Período ${periodId} no encontrado.`);
    }
  }

  private async loadPeriodsInOrder(periodIds: number[]): Promise<Period[]> {
    const unique = [...new Set(periodIds)];
    const periods = await this.periodRepo.find({
      where: { id: In(unique), deleted: false },
    });
    if (periods.length !== unique.length) {
      throw new NotFoundException('Uno o más períodos no existen.');
    }
    return unique.map((id) => periods.find((p) => p.id === id)!);
  }

  private async metricForPeriod(p: Period): Promise<PeriodMetricResponseDto> {
    const row = await this.sectionRepo
      .createQueryBuilder('sec')
      .leftJoin('sec.subject', 'sub')
      .select('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sec.capacity), 0)', 'totalCapacity')
      .addSelect('COALESCE(SUM(sub.hours), 0)', 'totalSubjectHours')
      .where('sec.periodId = :id', { id: p.id })
      .andWhere('sec.deleted = :df', { df: false })
      .getRawOne();
    return {
      periodId: p.id,
      periodName: p.name,
      periodStart: p.start.toISOString(),
      sectionCount: Number(row?.sectionCount ?? 0),
      totalCapacity: Number(row?.totalCapacity ?? 0),
      totalSubjectHours: Number(row?.totalSubjectHours ?? 0),
    };
  }

  private buildDeltasFromFirst(
    metrics: PeriodMetricResponseDto[],
  ): PeriodComparisonDeltaDto[] {
    if (metrics.length === 0) {
      return [];
    }
    const first = metrics[0];
    return metrics.map((m) => ({
      periodId: m.periodId,
      sectionDeltaFromFirst: m.sectionCount - first.sectionCount,
      capacityDeltaFromFirst: m.totalCapacity - first.totalCapacity,
      subjectHoursDeltaFromFirst: m.totalSubjectHours - first.totalSubjectHours,
    }));
  }

  /** Asignaturas que crecieron en capacidad o secciones entre dos períodos. */
  private async subjectDemandIncreases(
    basePeriodId: number,
    referencePeriodId: number,
  ): Promise<SubjectDemandIncreaseItemDto[]> {
    if (basePeriodId === referencePeriodId) {
      return [];
    }
    const [baseRows, referenceRows] = await Promise.all([
      this.subjectAggregateRows(basePeriodId),
      this.subjectAggregateRows(referencePeriodId),
    ]);
    const referenceMap = new Map(referenceRows.map((r) => [r.subjectId, r]));
    return baseRows
      .map((base) => {
        const ref = referenceMap.get(base.subjectId);
        if (!ref) {
          return null;
        }
        const capacityDelta = ref.totalCapacity - base.totalCapacity;
        const sectionDelta = ref.sectionCount - base.sectionCount;
        if (capacityDelta <= 0 && sectionDelta <= 0) {
          return null;
        }
        return {
          subjectId: base.subjectId,
          subjectCode: base.subjectCode,
          subjectName: base.subjectName,
          baseTotalCapacity: base.totalCapacity,
          referenceTotalCapacity: ref.totalCapacity,
          capacityDelta,
          baseSectionCount: base.sectionCount,
          referenceSectionCount: ref.sectionCount,
          sectionDelta,
        };
      })
      .filter((item): item is SubjectDemandIncreaseItemDto => item !== null)
      .sort((a, b) => b.capacityDelta - a.capacityDelta || b.sectionDelta - a.sectionDelta);
  }

  /** Agregación base por asignatura usada para comparación entre períodos. */
  private async subjectAggregateRows(periodId: number) {
    return this.sectionRepo
      .createQueryBuilder('sec')
      .innerJoin('sec.subject', 'sub')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .andWhere('sub.deleted = :df', { df: false })
      .select('sub.id', 'subjectId')
      .addSelect('sub.code', 'subjectCode')
      .addSelect('sub.name', 'subjectName')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sec.capacity), 0)', 'totalCapacity')
      .groupBy('sub.id')
      .addGroupBy('sub.code')
      .addGroupBy('sub.name')
      .getRawMany()
      .then((rows) =>
        rows.map((r) => ({
          subjectId: Number(r.subjectId),
          subjectCode: r.subjectCode,
          subjectName: r.subjectName,
          sectionCount: Number(r.sectionCount),
          totalCapacity: Number(r.totalCapacity),
        })),
      );
  }

  private async sectionWorkloadRows(periodId: number) {
    const rows = await this.sectionRepo
      .createQueryBuilder('sec')
      .innerJoin('sec.teacher', 't')
      .leftJoin('sec.subject', 'sub')
      .where('sec.periodId = :pid', { pid: periodId })
      .andWhere('sec.deleted = :df', { df: false })
      .andWhere('t.deleted = :df', { df: false })
      .select('t.id', 'teacherId')
      .addSelect('t.firstName', 'firstName')
      .addSelect('t.lastName', 'lastName')
      .addSelect('COUNT(sec.id)', 'sectionCount')
      .addSelect('COALESCE(SUM(sub.hours), 0)', 'totalSubjectHours')
      .groupBy('t.id')
      .addGroupBy('t.firstName')
      .addGroupBy('t.lastName')
      .orderBy('t.lastName', 'ASC')
      .addOrderBy('t.firstName', 'ASC')
      .getRawMany();
    return rows.map((r) => ({
      teacherId: Number(r.teacherId),
      firstName: r.firstName,
      lastName: r.lastName as string | undefined,
      sectionCount: Number(r.sectionCount),
      totalSubjectHours: Number(r.totalSubjectHours),
    }));
  }

  private async scheduleBlocksByTeacher(
    periodId: number,
  ): Promise<Map<number, number>> {
    const rows = await this.scheduleRepo
      .createQueryBuilder('sch')
      .innerJoin('sch.section', 'sec', 'sec.deleted = :df', { df: false })
      .where('sch.periodId = :pid', { pid: periodId })
      .andWhere('sch.deleted = :df', { df: false })
      .select('sec.teacherId', 'teacherId')
      .addSelect('COUNT(sch.id)', 'cnt')
      .groupBy('sec.teacherId')
      .getRawMany();
    const map = new Map<number, number>();
    for (const r of rows) {
      map.set(Number(r.teacherId), Number(r.cnt));
    }
    return map;
  }

}
