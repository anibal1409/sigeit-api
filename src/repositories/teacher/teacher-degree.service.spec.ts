import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Subject } from '../subject/entities';
import { TeacherDegree, TeacherGrade } from './entities';
import { DegreeLevel } from './enum';
import { TeacherDegreeService } from './teacher-degree.service';
import { TeacherService } from './teacher.service';
import { readTranscriptWithAi } from './transcript-ai.reader';
import { extractPdfText } from './transcript.parser';

jest.mock('./transcript-ai.reader');
jest.mock('./transcript.parser', () => ({
  ...jest.requireActual('./transcript.parser'),
  extractPdfText: jest.fn(),
}));

describe('TeacherDegreeService', () => {
  let service: TeacherDegreeService;
  const aiPreview = { maxGrade: 20, grades: [{ subjectName: 'Álgebra' }] };
  const file = (originalname: string) => ({
    originalname,
    buffer: Buffer.from('x'),
  });

  const poo = {
    id: 2,
    code: '0715963',
    name: 'Programación Orientada a Objetos',
  };
  const subjects = [
    { id: 1, code: '0081814', name: 'Matemáticas I' },
    poo,
    { id: 3, code: '0071234', name: 'Física I' },
  ];
  const previousGrades = [{ normalizedName: 'programacion i', subject: poo }];
  const degreeRepository = {
    save: jest.fn(async (item) => ({ id: 1, ...item })),
    findOne: jest.fn(async () => ({ id: 1, grades: [] })),
  };

  beforeEach(async () => {
    jest.mocked(readTranscriptWithAi).mockReset().mockResolvedValue(aiPreview);
    const module = await Test.createTestingModule({
      providers: [
        TeacherDegreeService,
        { provide: getRepositoryToken(TeacherDegree), useValue: degreeRepository },
        {
          provide: getRepositoryToken(TeacherGrade),
          useValue: { find: jest.fn().mockResolvedValue(previousGrades) },
        },
        {
          provide: getRepositoryToken(Subject),
          useValue: { find: jest.fn().mockResolvedValue(subjects) },
        },
        { provide: TeacherService, useValue: { findValid: jest.fn() } },
      ],
    }).compile();
    service = module.get(TeacherDegreeService);
  });

  describe('parseTranscript', () => {
    it('lee localmente un PDF con texto en formato UDO, sin llamar a la IA', async () => {
      jest
        .mocked(extractPdfText)
        .mockResolvedValue('0081814Matemáticas I4805CINCOF');

      const preview = await service.parseTranscript(file('record.PDF'));

      expect(preview.grades).toEqual([
        expect.objectContaining({ subjectName: 'Matemáticas I', grade: 5 }),
      ]);
      expect(readTranscriptWithAi).not.toHaveBeenCalled();
    });

    it('envía a la IA los PDF escaneados (sin texto reconocible)', async () => {
      jest.mocked(extractPdfText).mockResolvedValue('');

      await expect(service.parseTranscript(file('scan.pdf'))).resolves.toBe(
        aiPreview,
      );
      expect(readTranscriptWithAi).toHaveBeenCalledWith(
        expect.any(Buffer),
        'application/pdf',
      );
    });

    it('envía las imágenes a la IA con su tipo MIME', async () => {
      await service.parseTranscript(file('foto.JPG'));

      expect(readTranscriptWithAi).toHaveBeenCalledWith(
        expect.any(Buffer),
        'image/jpeg',
      );
    });

    it('sugiere la equivalencia por código, por uso previo o por nombre', async () => {
      jest.mocked(readTranscriptWithAi).mockResolvedValue({
        maxGrade: 20,
        grades: [
          { code: '81814', subjectName: 'Cálculo' },
          { subjectName: 'Programación I' },
          { subjectName: 'FISICA  I' },
          { subjectName: 'Dibujo' },
        ],
      });

      const { grades } = await service.parseTranscript(file('foto.png'));

      expect(grades.map((grade) => grade.subject?.id)).toEqual([
        1,
        2,
        3,
        undefined,
      ]);
    });

    it('rechaza formatos no soportados', async () => {
      await expect(
        service.parseTranscript(file('notas.docx')),
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  it('rechaza notas mayores que la escala del título', async () => {
    await expect(
      service.create({
        teacher: { id: 1 },
        level: DegreeLevel.Undergraduate,
        title: 'Ingeniería',
        maxGrade: 10,
        grades: [{ subjectName: 'Física I', grade: 15 }],
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it('registra solo el título cuando no se envían notas', async () => {
    await service.create({
      teacher: { id: 1 },
      level: DegreeLevel.Master,
      title: 'Maestría en Informática',
      maxGrade: 20,
    });

    expect(degreeRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Maestría en Informática', grades: [] }),
    );
  });
});
