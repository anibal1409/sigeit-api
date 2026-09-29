import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Schedule } from '../entities';
import { teacherName } from '../schedule-time.util';

/** Vista compacta de un horario para mostrar choques y auditorías. */
export class ScheduleLiteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  dayId: number;

  @ApiProperty()
  dayName: string;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;

  @ApiProperty()
  classroomId: number;

  @ApiProperty()
  classroomName: string;

  @ApiProperty()
  sectionId: number;

  @ApiProperty()
  sectionName: string;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  subjectCode: string;

  @ApiProperty()
  subjectName: string;

  @ApiPropertyOptional({ nullable: true })
  teacherName: string | null;

  /** Requiere las relaciones day, classroom, section, section.subject y section.teacher. */
  constructor(item: Schedule) {
    const { section } = item;
    this.id = item.id;
    this.dayId = item.day.id;
    this.dayName = item.day.name;
    this.start = item.start;
    this.end = item.end;
    this.classroomId = item.classroom.id;
    this.classroomName = item.classroom.name;
    this.sectionId = section.id;
    this.sectionName = section.name;
    this.subjectId = section.subject.id;
    this.subjectCode = section.subject.code;
    this.subjectName = section.subject.name;
    this.teacherName = teacherName(section.teacher);
  }
}

/** Choques de un bloque candidato. */
export class ScheduleConflictsDto {
  @ApiProperty({
    description:
      'true si hay choques de aula o profesor (bloquean el guardado)',
  })
  blocking: boolean;

  @ApiProperty({
    description: 'Nivel de mayor demanda de la asignatura (0 = sin demanda)',
  })
  peakLevel: number;

  @ApiProperty({ type: [ScheduleLiteDto], description: 'Aula ocupada' })
  classroom: ScheduleLiteDto[];

  @ApiProperty({
    type: [ScheduleLiteDto],
    description:
      'Mismo profesor en el bloque (no aplica a "Profesor por Asignar")',
  })
  teacher: ScheduleLiteDto[];

  @ApiProperty({
    type: [ScheduleLiteDto],
    description: 'Otras asignaturas con el mismo nivel pico (solo advertencia)',
  })
  level: ScheduleLiteDto[];
}

/** Choques de un día dentro de un guardado en varios días. */
export class DayConflictsDto extends ScheduleConflictsDto {
  @ApiProperty()
  dayId: number;
}

/** Aula disponible para un bloque libre. */
export class FreeClassroomDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}

/** Bloque en el que la sección puede programarse sin choques de profesor. */
export class FreeSlotDto {
  @ApiProperty()
  dayId: number;

  @ApiProperty()
  dayName: string;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;

  @ApiProperty({
    description: 'true si coincide con otra asignatura del mismo nivel pico',
  })
  levelConflict: boolean;

  @ApiProperty({ type: [FreeClassroomDto] })
  classrooms: FreeClassroomDto[];
}

/** Estado de las horas programadas de una sección frente a las de la asignatura. */
export enum CoverageStatus {
  Empty = 'EMPTY',
  Incomplete = 'INCOMPLETE',
  Complete = 'COMPLETE',
  Exceeded = 'EXCEEDED',
}

/** Horas académicas asignadas frente a las requeridas por la asignatura. */
export class SectionCoverageDto {
  @ApiProperty()
  sectionId: number;

  @ApiProperty()
  sectionName: string;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  subjectCode: string;

  @ApiProperty()
  subjectName: string;

  @ApiProperty()
  semester: number;

  @ApiPropertyOptional({ nullable: true })
  teacherName: string | null;

  @ApiProperty({ description: 'Horas semanales de la asignatura' })
  requiredHours: number;

  @ApiProperty({ description: 'Horas académicas programadas' })
  assignedHours: number;

  @ApiProperty({ enum: CoverageStatus, enumName: 'CoverageStatus' })
  status: CoverageStatus;
}

/** Dos horarios que chocan entre sí. */
export class ConflictPairDto {
  @ApiProperty({ type: ScheduleLiteDto })
  first: ScheduleLiteDto;

  @ApiProperty({ type: ScheduleLiteDto })
  second: ScheduleLiteDto;
}

/** Totales de la auditoría. */
export class AuditSummaryDto {
  @ApiProperty()
  classroom: number;

  @ApiProperty()
  teacher: number;

  @ApiProperty()
  level: number;

  @ApiProperty()
  outOfRange: number;

  @ApiProperty()
  incompleteSections: number;
}

/** Revisión completa de la planificación de un período. */
export class PeriodAuditDto {
  @ApiProperty({ type: AuditSummaryDto })
  summary: AuditSummaryDto;

  @ApiProperty({
    type: [ConflictPairDto],
    description: 'Aula física ocupada dos veces',
  })
  classroom: ConflictPairDto[];

  @ApiProperty({
    type: [ConflictPairDto],
    description: 'Mismo profesor en dos bloques a la vez',
  })
  teacher: ConflictPairDto[];

  @ApiProperty({
    type: [ConflictPairDto],
    description: 'Asignaturas del mismo nivel pico a la vez',
  })
  level: ConflictPairDto[];

  @ApiProperty({
    type: [ScheduleLiteDto],
    description: 'Bloques fuera de la franja del período o con horas inválidas',
  })
  outOfRange: ScheduleLiteDto[];

  @ApiProperty({
    type: [SectionCoverageDto],
    description:
      'Secciones sin horas completas (vacías, incompletas o excedidas)',
  })
  incompleteSections: SectionCoverageDto[];
}
