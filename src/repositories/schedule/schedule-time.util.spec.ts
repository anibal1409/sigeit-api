import { Schedule } from './entities';
import {
  academicHours,
  consecutiveBlocks,
  findOverlaps,
  isWithinPeriod,
  overlaps,
  peakLevel,
  periodSlots,
  realTeacherId,
} from './schedule-time.util';

const period = {
  startTime: '07:00',
  endTime: '09:00',
  duration: 45,
  interval: 5,
};

/** Horario mínimo para evaluar choques. */
function schedule(
  id: number,
  start: string,
  end: string,
  opts: {
    classroom?: number;
    virtual?: boolean;
    section?: number;
    subject?: number;
    teacher?: number;
  },
): Schedule {
  return {
    id,
    start,
    end,
    classroom: {
      id: opts.classroom ?? 1,
      type: opts.virtual ? 'VIRTUAL' : 'CLASSROOM',
    },
    section: {
      id: opts.section ?? id,
      subject: { id: opts.subject ?? id },
      teacher: opts.teacher
        ? { id: opts.teacher, firstName: 'Ana', lastName: 'Díaz' }
        : null,
    },
  } as unknown as Schedule;
}

describe('schedule-time.util', () => {
  it('bloques consecutivos no se solapan', () => {
    expect(
      overlaps(
        { start: '07:00', end: '08:30' },
        { start: '08:30', end: '09:00' },
      ),
    ).toBe(false);
    expect(
      overlaps(
        { start: '07:00', end: '08:31' },
        { start: '08:30', end: '09:00' },
      ),
    ).toBe(true);
  });

  it('arma la grilla del período y los bloques de varias horas', () => {
    const slots = periodSlots(period);
    expect(slots).toEqual([
      { start: '07:00', end: '07:45' },
      { start: '07:50', end: '08:35' },
      { start: '08:40', end: '09:25' },
    ]);
    expect(consecutiveBlocks(slots, 2)).toEqual([
      { start: '07:00', end: '08:35' },
      { start: '07:50', end: '09:25' },
    ]);
    expect(consecutiveBlocks(slots, 4)).toEqual([]);
  });

  it('cuenta horas académicas y valida la franja', () => {
    expect(academicHours({ start: '07:00', end: '08:35' }, 45)).toBe(2);
    expect(isWithinPeriod({ start: '08:40', end: '09:25' }, period)).toBe(true);
    expect(isWithinPeriod({ start: '06:30', end: '07:45' }, period)).toBe(
      false,
    );
    expect(isWithinPeriod({ start: '08:00', end: '08:00' }, period)).toBe(
      false,
    );
    expect(isWithinPeriod({ start: '7:00', end: '07:45' }, period)).toBe(false);
  });

  it('nivel pico: mayor cantidad y, en empate, el menor nivel', () => {
    expect(
      peakLevel(
        new Map([
          [3, 10],
          [1, 10],
          [2, 5],
        ]),
      ),
    ).toBe(1);
    expect(peakLevel(new Map())).toBe(0);
  });

  it('el profesor comodín "por asignar" no cuenta como profesor real', () => {
    expect(
      realTeacherId({ id: 16, firstName: 'Profesor', lastName: 'por Asignar' }),
    ).toBeUndefined();
    expect(realTeacherId({ id: 7, firstName: 'Ana', lastName: 'Díaz' })).toBe(
      7,
    );
    expect(realTeacherId(null)).toBeUndefined();
  });

  it('clasifica choques de aula, profesor/sección y nivel', () => {
    const peaks = new Map([
      [10, 2],
      [20, 2],
      [30, 3],
    ]);
    const context = {
      sectionId: 1,
      subjectId: 10,
      teacherId: 7,
      peakLevel: 2,
      peaks,
    };
    const found = findOverlaps(
      { start: '07:00', end: '08:35' },
      [
        schedule(2, '07:50', '08:35', {
          classroom: 5,
          teacher: 7,
          subject: 30,
        }),
        schedule(3, '07:00', '07:45', { virtual: true, subject: 20 }),
        schedule(4, '08:35', '09:25', {
          classroom: 5,
          teacher: 7,
          subject: 20,
        }),
        schedule(5, '07:00', '07:45', { section: 1, subject: 10, teacher: 7 }),
      ],
      context,
    );
    expect(found.classroom.map(({ id }) => id)).toEqual([2, 5]);
    expect(found.teacher.map(({ id }) => id)).toEqual([2, 5]);
    expect(found.level.map(({ id }) => id)).toEqual([3]);

    const noTeacher = findOverlaps(
      { start: '07:00', end: '07:45' },
      [schedule(6, '07:00', '07:45', { section: 1, subject: 10 })],
      { ...context, teacherId: undefined },
    );
    expect(noTeacher.teacher.map(({ id }) => id)).toEqual([6]);
  });
});
