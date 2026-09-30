import { Subject } from '../subject/entities';
import { TeacherGrade } from '../teacher/entities';
import { bestGrades } from './section-teacher.service';

describe('bestGrades', () => {
  const subject = {
    id: 9,
    code: '0722103',
    name: 'Matemáticas III',
  } as Subject;
  const degree = { maxGrade: 20, title: 'Ingeniería', level: 'UNDERGRADUATE' };
  const grade = (data: Partial<TeacherGrade>) =>
    ({ degree, ...data }) as TeacherGrade;

  it('identifica la misma asignatura por equivalencia, código o nombre', () => {
    const byEquivalence = grade({
      subjectName: 'Cálculo III',
      normalizedName: 'calculo iii',
      grade: 12,
      subject: subject,
    });
    const byCode = grade({
      code: '722103',
      subjectName: 'Mate III',
      normalizedName: 'mate iii',
      grade: 18,
    });
    const byName = grade({
      subjectName: 'MATEMATICAS III',
      normalizedName: 'matematicas iii',
      grade: 15,
    });

    const { same } = bestGrades([byEquivalence, byCode, byName], subject);

    expect(same).toMatchObject({ subjectName: 'Mate III', percent: 90 });
  });

  it('considera parecida la que comparte una palabra clave, no una genérica', () => {
    const programming = {
      id: 10,
      code: '0082833',
      name: 'Introducción a la Programación',
    } as Subject;
    const similar = grade({
      subjectName: 'Programación I',
      normalizedName: 'programacion i',
      grade: 16,
    });
    const generic = grade({
      subjectName: 'Introducción a la Física',
      normalizedName: 'introduccion a la fisica',
      grade: 20,
    });

    const result = bestGrades([similar, generic], programming);

    expect(result.same).toBeUndefined();
    expect(result.similar).toMatchObject({ subjectName: 'Programación I' });
  });
});
