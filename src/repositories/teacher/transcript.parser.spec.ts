import { parseTranscriptText } from './transcript.parser';

describe('parseTranscriptText', () => {
  it('lee el récord de la UDO con columnas pegadas o separadas, períodos y resumen', () => {
    const text = [
      'Documento de Caracter Informativo, No valido para Tramites Oficiales. ',
      ' Br.: FARIÑAS BARRERA, ANIBAL ANTONIO; Cédula de Identidad: 23.539.583, ',
      'estudiante de la especialidad: Ingeniería de Sistemas.',
      '- Período: 2013-1 (Mar - Dic 2013)',
      'CódigoAsignaturasSecciónDefinitivaExamen',
      '0061013Comprensión y Expresión Lingüística I4809NUEVEF',
      'Asig. Inscr.: 5Asig. Curs.: 5Asig. Ret.: 0Créd. Aprob.: 16Prom. Gen.: 8.00',
      '- Período: 2014-3 (Sep 2014  - Feb 2015)',
      '0021111Extraacadémica07RTRETIRADAF',
      '0712642 Introducción a la Ingeniería de Sistemas 04 10 DIEZ F',
      '0713633Enfoque Sistémico0105CINCOR',
      'Asig. Inscr.: 3Asig. Curs.: 2Asig. Ret.: 1Créd. Aprob.: 8Prom. Gen.: 5.00',
      '- Período: 2018-2 (Ene - Jun 2019)',
      '0715116Trabajo de Grado01APAPROBADOF',
      'Asig. Inscr.: 1Asig. Curs.: 1Asig. Ret.: 0Créd. Aprob.: 6Prom. Gen.: 0.00',
      'RESUMEN',
      'Promedio General de Notas: ',
      '7.66',
      'Créditos1601591531',
      'Universidad de Oriente',
    ].join('\n');

    const preview = parseTranscriptText(text);

    expect(preview).toMatchObject({
      idDocument: '23539583',
      studentName: 'FARIÑAS BARRERA, ANIBAL ANTONIO',
      title: 'Ingeniería de Sistemas',
      institution: 'Universidad de Oriente',
      maxGrade: 10,
      average: 7.66,
      approvedCredits: 30,
      periods: [
        {
          code: '2013-1',
          label: 'Mar - Dic 2013',
          approvedCredits: 16,
          average: 8,
        },
        {
          code: '2014-3',
          label: 'Sep 2014 - Feb 2015',
          approvedCredits: 8,
          average: 5,
        },
        {
          code: '2018-2',
          label: 'Ene - Jun 2019',
          approvedCredits: 6,
          average: undefined,
        },
      ],
    });
    expect(preview.grades).toEqual([
      expect.objectContaining({
        code: '0061013',
        period: '2013-1',
        grade: 9,
        makeup: false,
      }),
      expect.objectContaining({
        code: '0021111',
        grade: undefined,
        remark: 'RETIRADA',
      }),
      expect.objectContaining({
        code: '0712642',
        subjectName: 'Introducción a la Ingeniería de Sistemas',
        period: '2014-3',
        grade: 10,
      }),
      expect.objectContaining({ code: '0713633', grade: 5, makeup: true }),
      expect.objectContaining({
        code: '0715116',
        period: '2018-2',
        remark: 'APROBADO',
      }),
    ]);
  });
});
