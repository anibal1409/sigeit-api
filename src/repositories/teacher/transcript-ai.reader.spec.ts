import { readTranscriptWithAi } from './transcript-ai.reader';

describe('readTranscriptWithAi', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    global.fetch = fetchMock;
    process.env.GEMINI_API_KEY = 'test-key';
  });

  afterEach(() => {
    fetchMock.mockReset();
    delete process.env.GEMINI_API_KEY;
  });

  it('envía el archivo a Gemini y normaliza la respuesta', async () => {
    const modelJson = {
      idDocument: 'V-12.345.678',
      title: ' Licenciatura en Matemáticas ',
      maxGrade: 5,
      minPassingGrade: 10,
      average: 17.5,
      approvedCredits: 0,
      classRank: 5,
      classSize: 24,
      graduationDate: '11/12/2014',
      onlyPassingGrades: true,
      periods: [
        { code: ' 2010-1 ', label: 'Mar - Jul 2010', average: 18 },
        { code: '' },
      ],
      grades: [
        {
          code: '001',
          subjectName: 'Álgebra',
          period: '2010-1',
          grade: 18,
          credits: 4,
          makeup: true,
        },
        { subjectName: 'Pasantía', grade: null, remark: 'APROBADO' },
        { subjectName: '  ' },
      ],
    };
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [
                { thought: true, text: 'razonando...' },
                { text: JSON.stringify(modelJson) },
              ],
            },
          },
        ],
      }),
    });

    const preview = await readTranscriptWithAi(Buffer.from('img'), 'image/png');

    const [, request] = fetchMock.mock.calls[0];
    const body = JSON.parse(request.body);
    expect(request.headers['x-goog-api-key']).toBe('test-key');
    expect(body.contents[0].parts[0].inlineData).toEqual({
      mimeType: 'image/png',
      data: Buffer.from('img').toString('base64'),
    });
    expect(preview).toEqual({
      idDocument: '12345678',
      studentName: undefined,
      title: 'Licenciatura en Matemáticas',
      institution: undefined,
      maxGrade: 20,
      minPassingGrade: 10,
      average: 17.5,
      approvedCredits: undefined,
      classRank: 5,
      classSize: 24,
      classAverage: undefined,
      graduationDate: undefined,
      onlyPassingGrades: true,
      periods: [
        {
          code: '2010-1',
          label: 'Mar - Jul 2010',
          average: 18,
          approvedCredits: undefined,
        },
      ],
      grades: [
        {
          code: '001',
          subjectName: 'Álgebra',
          period: '2010-1',
          grade: 18,
          remark: undefined,
          credits: 4,
          makeup: true,
        },
        {
          code: undefined,
          subjectName: 'Pasantía',
          period: undefined,
          grade: undefined,
          remark: 'APROBADO',
          credits: undefined,
          makeup: false,
        },
      ],
    });
  });

  describe('con varios modelos en GEMINI_MODEL', () => {
    const okResponse = {
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: '{"maxGrade":10,"grades":[{"subjectName":"Física I"}]}',
                },
              ],
            },
          },
        ],
      }),
    };
    const errorResponse = (status: number) => ({
      ok: false,
      status,
      text: async () => 'error',
    });
    const calledModels = () =>
      fetchMock.mock.calls.map(([url]) => url.match(/models\/(.+):/)[1]);

    beforeEach(() => {
      process.env.GEMINI_MODEL = 'modelo-a, modelo-b';
    });

    afterEach(() => {
      delete process.env.GEMINI_MODEL;
    });

    it('usa el siguiente modelo si el primero está saturado', async () => {
      fetchMock
        .mockResolvedValueOnce(errorResponse(503))
        .mockResolvedValueOnce(okResponse);

      const preview = await readTranscriptWithAi(Buffer.from('x'), 'image/png');

      expect(calledModels()).toEqual(['modelo-a', 'modelo-b']);
      expect(preview.grades[0].subjectName).toBe('Física I');
    });

    it('no reintenta con otro modelo si la key es inválida', async () => {
      fetchMock.mockResolvedValue(errorResponse(403));

      await expect(
        readTranscriptWithAi(Buffer.from('x'), 'image/png'),
      ).rejects.toMatchObject({ status: 503 });
      expect(calledModels()).toEqual(['modelo-a']);
    });
  });

  it('responde 503 sin GEMINI_API_KEY y no llama a la API', async () => {
    delete process.env.GEMINI_API_KEY;

    await expect(
      readTranscriptWithAi(Buffer.from('img'), 'image/png'),
    ).rejects.toMatchObject({ status: 503 });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
