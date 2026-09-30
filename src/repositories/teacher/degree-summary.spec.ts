import { attemptNumbers, gradeStatus, summarizeGrades } from './degree-summary';
import { GradeStatus } from './enum';

describe('degree-summary', () => {
  const grades = [
    {
      code: '0021111',
      subjectName: 'Extraacadémica',
      period: '2014-3',
      remark: 'RETIRADA',
    },
    {
      code: '0712642',
      subjectName: 'Introducción',
      period: '2013-1',
      grade: 4,
    },
    {
      code: '0712642',
      subjectName: 'Introducción',
      period: '2014-1',
      grade: 8,
    },
    {
      code: '0021111',
      subjectName: 'Extraacadémica',
      period: '2015-1',
      grade: 10,
    },
    {
      code: '0715116',
      subjectName: 'Trabajo de Grado',
      period: '2016-1',
      remark: 'EN EJECUCIÓN',
    },
    {
      subjectName: 'Programación I',
      period: '2016-1',
      remark: 'EQUIVALENCIA',
      subject: { id: 7 },
    },
  ];

  it('deduce el estado por el resultado escrito o por la nota mínima', () => {
    expect(grades.map((grade) => gradeStatus(grade, 5))).toEqual([
      GradeStatus.Withdrawn,
      GradeStatus.Failed,
      GradeStatus.Approved,
      GradeStatus.Approved,
      GradeStatus.InProgress,
      GradeStatus.Approved,
    ]);
    expect(gradeStatus({ subjectName: 'X' }, 5)).toBeUndefined();
  });

  it('numera los intentos en orden cronológico aunque vengan desordenados', () => {
    expect(attemptNumbers(grades)).toEqual([1, 1, 2, 2, 1, 1]);
  });

  it('resume períodos, repitencias, retiros, equivalencias y promedio', () => {
    const attempts = attemptNumbers(grades);
    const evaluated = grades.map((grade, index) => ({
      ...grade,
      status: gradeStatus(grade, 5),
      attempt: attempts[index],
    }));

    expect(summarizeGrades(evaluated, ['2013-1', '2013-2'])).toEqual({
      periods: 6,
      subjects: 4,
      approved: 3,
      failed: 1,
      withdrawn: 1,
      inProgress: 1,
      repeated: 2,
      equivalences: 1,
      gradeAverage: 7.33,
    });
  });
});
