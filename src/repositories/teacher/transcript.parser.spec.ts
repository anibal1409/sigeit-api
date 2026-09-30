import { parseTranscriptText } from './transcript.parser';

describe('parseTranscriptText', () => {
  it('lee el récord de la UDO con columnas pegadas o separadas', () => {
    const text = [
      'Documento de Caracter Informativo, No valido para Tramites Oficiales. ',
      ' Br.: FARIÑAS BARRERA, ANIBAL ANTONIO; Cédula de Identidad: 23.539.583, ',
      'estudiante de la especialidad: Ingeniería de Sistemas.',
      '- Período: 2013-1 (Mar - Dic 2013)',
      'CódigoAsignaturasSecciónDefinitivaExamen',
      '0061013Comprensión y Expresión Lingüística I4809NUEVEF',
      'Asig. Inscr.: 5Asig. Curs.: 5Asig. Ret.: 0Créd. Aprob.: 16Prom. Gen.: 8.00',
      '- Período: 2014-3 (Sep 2014 - Feb 2015)',
      '0021111Extraacadémica07RTRETIRADAF',
      '0712642 Introducción a la Ingeniería de Sistemas 04 10 DIEZ F',
      '0715116Trabajo de Grado02EJEN EJECUCIÓNF',
      'Universidad de Oriente',
    ].join('\n');

    expect(parseTranscriptText(text)).toEqual({
      idDocument: '23539583',
      studentName: 'FARIÑAS BARRERA, ANIBAL ANTONIO',
      title: 'Ingeniería de Sistemas',
      institution: 'Universidad de Oriente',
      maxGrade: 10,
      grades: [
        {
          code: '0061013',
          subjectName: 'Comprensión y Expresión Lingüística I',
          period: '2013-1',
          grade: 9,
          remark: undefined,
        },
        {
          code: '0021111',
          subjectName: 'Extraacadémica',
          period: '2014-3',
          grade: undefined,
          remark: 'RETIRADA',
        },
        {
          code: '0712642',
          subjectName: 'Introducción a la Ingeniería de Sistemas',
          period: '2014-3',
          grade: 10,
          remark: undefined,
        },
        {
          code: '0715116',
          subjectName: 'Trabajo de Grado',
          period: '2014-3',
          grade: undefined,
          remark: 'EN EJECUCIÓN',
        },
      ],
    });
  });
});
