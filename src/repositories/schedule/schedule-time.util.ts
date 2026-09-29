import { Period } from '../period/entities';
import { Schedule } from './entities';

/** Hora de un bloque en formato 24 h "HH:mm". */
export const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Tipo de aula que admite varias clases simultáneas. */
export const VIRTUAL_CLASSROOM = 'VIRTUAL';

/** Intervalo horario de un bloque. */
export interface TimeRange {
  start: string;
  end: string;
}

/**
 * Profesor comodín de secciones sin docente definido (p. ej. reservas de aula).
 * ponytail: se detecta por nombre; agregar un flag en Teacher si aparecen otros comodines.
 */
const PLACEHOLDER_TEACHER = /por asignar/i;

/** Datos de la sección que se evalúan al buscar choques. */
export interface ConflictContext {
  /** Una sección nunca puede tener dos bloques a la vez, tenga o no profesor. */
  sectionId: number;
  subjectId: number;
  /** Profesor real de la sección; sin profesor o comodín no genera choques de profesor. */
  teacherId?: number;
  /** Nivel de mayor demanda de la asignatura (0 = sin demanda). */
  peakLevel: number;
  /** Nivel pico por id de asignatura del período. */
  peaks: Map<number, number>;
}

/** Horarios que se solapan con un bloque, agrupados por tipo de choque. */
export interface OverlapResult {
  /** Horarios que ocupan un aula física en el bloque. */
  classroom: Schedule[];
  /** Horarios del mismo profesor o de la misma sección. */
  teacher: Schedule[];
  /** Horarios de otra asignatura con el mismo nivel pico. */
  level: Schedule[];
}

/** Id del profesor si es un docente real (no comodín "por asignar"). */
export function realTeacherId(
  teacher?: { id: number; firstName: string; lastName: string } | null,
): number | undefined {
  const name = teacherName(teacher);
  return name && !PLACEHOLDER_TEACHER.test(name) ? teacher.id : undefined;
}

/** Nombre completo del profesor, o null si la sección no tiene. */
export function teacherName(
  teacher?: { firstName: string; lastName: string } | null,
): string | null {
  return teacher ? `${teacher.firstName} ${teacher.lastName}` : null;
}

/** Minutos transcurridos desde medianoche de una hora "HH:mm". */
export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/** Hora "HH:mm" a partir de minutos desde medianoche. */
export function toTime(minutes: number): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

/** Intervalos semiabiertos: un bloque que termina 08:30 no choca con uno que empieza 08:30. */
export function overlaps(a: TimeRange, b: TimeRange): boolean {
  return (
    toMinutes(a.start) < toMinutes(b.end) &&
    toMinutes(a.end) > toMinutes(b.start)
  );
}

/** Horas académicas de un bloque: minutos entre la duración de la hora académica, truncado. */
export function academicHours(range: TimeRange, duration: number): number {
  return Math.floor((toMinutes(range.end) - toMinutes(range.start)) / duration);
}

/**
 * Bloques de una hora académica en la franja del período. Cada bloque dura
 * `duration` y el siguiente empieza tras `interval` minutos de descanso.
 */
export function periodSlots(
  period: Pick<Period, 'startTime' | 'endTime' | 'duration' | 'interval'>,
): TimeRange[] {
  const slots: TimeRange[] = [];
  const limit = toMinutes(period.endTime);
  const step = period.duration + period.interval;
  for (let time = toMinutes(period.startTime); time < limit; time += step) {
    slots.push({ start: toTime(time), end: toTime(time + period.duration) });
  }
  return slots;
}

/** Bloques de `hours` horas académicas seguidas que caben en la grilla. */
export function consecutiveBlocks(
  slots: TimeRange[],
  hours: number,
): TimeRange[] {
  return slots
    .slice(0, Math.max(slots.length - hours + 1, 0))
    .map((slot, index) => ({
      start: slot.start,
      end: slots[index + hours - 1].end,
    }));
}

/** true si ambas horas son "HH:mm" válidas y el inicio es anterior al fin. */
export function isValidRange(range: TimeRange): boolean {
  return (
    TIME_PATTERN.test(range.start) &&
    TIME_PATTERN.test(range.end) &&
    toMinutes(range.start) < toMinutes(range.end)
  );
}

/** Fin del último bloque de la grilla (puede pasar de `endTime`). */
export function periodLimit(
  period: Pick<Period, 'startTime' | 'endTime' | 'duration' | 'interval'>,
): string {
  return periodSlots(period).at(-1)?.end ?? period.endTime;
}

/** true si el bloque es válido y cae dentro de la franja horaria del período. */
export function isWithinPeriod(
  range: TimeRange,
  period: Pick<Period, 'startTime' | 'endTime' | 'duration' | 'interval'>,
): boolean {
  return (
    isValidRange(range) &&
    toMinutes(range.start) >= toMinutes(period.startTime) &&
    toMinutes(range.end) <= toMinutes(periodLimit(period))
  );
}

/** Nivel con mayor cantidad (empate: el menor), igual que el frontend. 0 si no hay demanda. */
export function peakLevel(byLevel: Map<number, number>): number {
  let peak = 0;
  let max = 0;
  [...byLevel.entries()]
    .sort(([a], [b]) => a - b)
    .forEach(([level, quantity]) => {
      if (quantity > max) {
        max = quantity;
        peak = level;
      }
    });
  return peak;
}

/**
 * Clasifica los horarios que se solapan con `range`. Las aulas virtuales nunca
 * chocan; el choque de nivel solo aplica entre asignaturas distintas.
 */
export function findOverlaps(
  range: TimeRange,
  schedules: Schedule[],
  context: ConflictContext,
): OverlapResult {
  const overlapping = schedules.filter((item) => overlaps(item, range));
  return {
    classroom: overlapping.filter(
      (item) => item.classroom?.type !== VIRTUAL_CLASSROOM,
    ),
    teacher: overlapping.filter(
      (item) =>
        item.section.id === context.sectionId ||
        (!!context.teacherId && item.section.teacher?.id === context.teacherId),
    ),
    level: overlapping.filter(
      (item) =>
        context.peakLevel > 0 &&
        item.section.subject.id !== context.subjectId &&
        context.peaks.get(item.section.subject.id) === context.peakLevel,
    ),
  };
}
