import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

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

  beforeEach(async () => {
    jest.mocked(readTranscriptWithAi).mockReset().mockResolvedValue(aiPreview);
    const module = await Test.createTestingModule({
      providers: [
        TeacherDegreeService,
        { provide: getRepositoryToken(TeacherDegree), useValue: {} },
        { provide: getRepositoryToken(TeacherGrade), useValue: {} },
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
});
