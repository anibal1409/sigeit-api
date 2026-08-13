import { ApiProperty } from '@nestjs/swagger';

/** Métricas agregadas por período (secciones y cupo planificado). */
export class PeriodMetricResponseDto {
  @ApiProperty()
  periodId!: number;

  @ApiProperty()
  periodName!: string;

  @ApiProperty({ description: 'Fecha de inicio del período (ISO).' })
  periodStart!: string;

  @ApiProperty()
  sectionCount!: number;

  @ApiProperty({ description: 'Suma de capacidades de las secciones.' })
  totalCapacity!: number;

  @ApiProperty({
    description: 'Suma de horas de materia por sección (carga académica ofertada).',
  })
  totalSubjectHours!: number;
}

/** Deltas respecto al primer período de la lista solicitada. */
export class PeriodComparisonDeltaDto {
  @ApiProperty()
  periodId!: number;

  @ApiProperty()
  sectionDeltaFromFirst!: number;

  @ApiProperty()
  capacityDeltaFromFirst!: number;

  @ApiProperty()
  subjectHoursDeltaFromFirst!: number;
}

export class SubjectDemandIncreaseItemDto {
  @ApiProperty()
  subjectId!: number;

  @ApiProperty()
  subjectCode!: string;

  @ApiProperty()
  subjectName!: string;

  @ApiProperty({
    description: 'Capacidad total en el período base.',
  })
  baseTotalCapacity!: number;

  @ApiProperty({
    description: 'Capacidad total en el período de referencia (último de la comparación).',
  })
  referenceTotalCapacity!: number;

  @ApiProperty({
    description: 'Diferencia de capacidad entre el período de referencia y el base.',
  })
  capacityDelta!: number;

  @ApiProperty({
    description: 'Cantidad de secciones en el período base.',
  })
  baseSectionCount!: number;

  @ApiProperty({
    description: 'Cantidad de secciones en el período de referencia.',
  })
  referenceSectionCount!: number;

  @ApiProperty({
    description: 'Diferencia de secciones entre el período de referencia y el base.',
  })
  sectionDelta!: number;
}

export class PeriodComparisonResponseDto {
  @ApiProperty({ type: [PeriodMetricResponseDto] })
  metrics!: PeriodMetricResponseDto[];

  @ApiProperty({
    type: [PeriodComparisonDeltaDto],
    description: 'El primer elemento corresponde al primer periodId enviado (deltas en 0).',
  })
  deltasFromFirst!: PeriodComparisonDeltaDto[];

  @ApiProperty({
    type: [SubjectDemandIncreaseItemDto],
    description:
      'Asignaturas cuyo cupo o número de secciones aumentó entre el primer y el último período comparado.',
  })
  subjectDemandIncreases!: SubjectDemandIncreaseItemDto[];
}

export class TeachersByDayItemDto {
  @ApiProperty()
  dayId!: number;

  @ApiProperty()
  dayName!: string;

  @ApiProperty()
  dayAbbreviation!: string;

  @ApiProperty({
    description: 'Profesores distintos con al menos un bloque planificado ese día.',
  })
  teacherCount!: number;
}

export class TeachersByDayResponseDto {
  @ApiProperty({ type: [TeachersByDayItemDto] })
  items!: TeachersByDayItemDto[];
}

export class DepartmentStatItemDto {
  @ApiProperty()
  departmentId!: number;

  @ApiProperty()
  departmentName!: string;

  @ApiProperty()
  sectionCount!: number;

  @ApiProperty()
  totalCapacity!: number;
}

export class SubjectStatItemDto {
  @ApiProperty()
  subjectId!: number;

  @ApiProperty()
  subjectCode!: string;

  @ApiProperty()
  subjectName!: string;

  @ApiProperty()
  sectionCount!: number;

  @ApiProperty()
  totalCapacity!: number;
}

export class TeacherWorkloadItemDto {
  @ApiProperty()
  teacherId!: number;

  @ApiProperty()
  firstName!: string;

  @ApiProperty({ nullable: true })
  lastName!: string | null;

  @ApiProperty()
  sectionCount!: number;

  @ApiProperty({ description: 'Bloques de horario (filas en planificación).' })
  scheduleBlockCount!: number;

  @ApiProperty({ description: 'Suma de horas de materia de sus secciones.' })
  totalSubjectHours!: number;
}

export class ClassroomUsageItemDto {
  @ApiProperty()
  classroomId!: number;

  @ApiProperty()
  classroomName!: string;

  @ApiProperty()
  scheduleBlockCount!: number;
}

export class StartTimeSlotItemDto {
  @ApiProperty({ example: '07:00' })
  startTime!: string;

  @ApiProperty()
  blockCount!: number;
}

export class SectionOpenDistributionItemDto {
  @ApiProperty({
    description: 'true = abierta a todas las carreras (campo all de la sección).',
  })
  openToAll!: boolean;

  @ApiProperty()
  sectionCount!: number;
}

export class TimelineItemDto {
  @ApiProperty()
  periodId!: number;

  @ApiProperty()
  periodName!: string;

  @ApiProperty()
  periodStart!: string;

  @ApiProperty()
  sectionCount!: number;

  @ApiProperty()
  totalCapacity!: number;

  @ApiProperty()
  totalSubjectHours!: number;
}

export class CareerSectionStatItemDto {
  @ApiProperty()
  careerId!: number;

  @ApiProperty()
  careerName!: string;

  @ApiProperty()
  careerAbbreviation!: string;

  @ApiProperty({
    description:
      'Secciones cuya materia incluye esta carrera (una sección puede contar en varias carreras).',
  })
  sectionCount!: number;
}

export class CurriculumSemesterStatItemDto {
  @ApiProperty({ description: 'Semestre del pensum (campo semester de la materia).' })
  curriculumSemester!: number;

  @ApiProperty()
  sectionCount!: number;

  @ApiProperty()
  totalCapacity!: number;
}
