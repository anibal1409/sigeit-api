import {
  BadRequestException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

import {
  TeacherDegreePeriodDto,
  TeacherGradeDto,
  TranscriptPreviewDto,
} from './dto';
import { detectMaxGrade } from './transcript.parser';

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';
const TIMEOUT_MS = 90_000;
const LOG_CONTEXT = 'TranscriptAiReader';

/**
 * Errores con los que se intenta el siguiente modelo de GEMINI_MODEL: modelo
 * inexistente, cuota agotada o servicio saturado. Los demás (key inválida,
 * petición mal formada) se repetirían con cualquier modelo.
 */
const FALLBACK_STATUS = new Set([404, 429, 500, 502, 503, 504]);

/** Instrucciones de extracción; el formato exacto lo impone `RESPONSE_SCHEMA`. */
const PROMPT = `Extrae los datos de este récord, historial o certificación de notas académicas.
- Una entrada en "grades" por cada asignatura cursada, en el orden del documento; si una asignatura aparece varias veces (repitencia), incluye cada vez.
- "grade": nota definitiva numérica. Si el resultado no es numérico (retirada, aprobado, en ejecución, equivalencia...), deja "grade" en null y escribe el resultado en "remark".
- "period": solo el código del período o lapso académico, sin fechas ni descripción (p. ej. "2015-1" o "2019-A", no "2015-1 (Mar - Jul 2015)").
- "credits": créditos o unidades de crédito (UC) de la asignatura, si hay esa columna.
- "makeup": true si la nota se obtuvo en examen de reparación (tipo de examen "R" o "Reparación").
- "periods": un elemento por período, con "code" (mismo formato que "period"), "label" (fechas o descripción, p. ej. "Mar - Dic 2013" o "Intensivo 2015"), "average" (promedio del período) y "approvedCredits" (créditos aprobados en el período), si aparecen.
- "title": carrera, especialidad o programa; "institution": universidad o instituto.
- "maxGrade": nota máxima de la escala; si el documento no la indica, usa 10 si todas las notas son 10 o menos, y 20 en caso contrario.
- "minPassingGrade": nota mínima aprobatoria general, si el documento la indica.
- "average": promedio general de la carrera (promedio de calificaciones, índice académico o IRA general).
- "approvedCredits": créditos o UC aprobados en total, si aparecen.
- "classRank", "classSize" y "classAverage": puesto en la promoción, cantidad de egresados y promedio de la promoción, si aparecen.
- "graduationDate": fecha de grado en formato AAAA-MM-DD, si aparece.
- "onlyPassingGrades": true si el documento declara que solo incluye notas aprobatorias.
- No inventes datos: deja en null lo que no aparezca o no se lea con claridad.`;

/** Esquema de salida estructurada de Gemini (subconjunto OpenAPI); refleja `TranscriptPreviewDto`. */
const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    idDocument: { type: 'STRING', nullable: true },
    studentName: { type: 'STRING', nullable: true },
    title: { type: 'STRING', nullable: true },
    institution: { type: 'STRING', nullable: true },
    maxGrade: { type: 'NUMBER' },
    minPassingGrade: { type: 'NUMBER', nullable: true },
    average: { type: 'NUMBER', nullable: true },
    approvedCredits: { type: 'NUMBER', nullable: true },
    classRank: { type: 'INTEGER', nullable: true },
    classSize: { type: 'INTEGER', nullable: true },
    classAverage: { type: 'NUMBER', nullable: true },
    graduationDate: { type: 'STRING', nullable: true },
    onlyPassingGrades: { type: 'BOOLEAN', nullable: true },
    periods: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          code: { type: 'STRING' },
          label: { type: 'STRING', nullable: true },
          average: { type: 'NUMBER', nullable: true },
          approvedCredits: { type: 'NUMBER', nullable: true },
        },
        required: ['code'],
      },
    },
    grades: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          code: { type: 'STRING', nullable: true },
          subjectName: { type: 'STRING' },
          period: { type: 'STRING', nullable: true },
          grade: { type: 'NUMBER', nullable: true },
          remark: { type: 'STRING', nullable: true },
          credits: { type: 'NUMBER', nullable: true },
          makeup: { type: 'BOOLEAN', nullable: true },
        },
        required: ['subjectName'],
      },
    },
  },
  required: ['maxGrade', 'grades'],
};

/**
 * Lee un récord de notas escaneado o fotografiado con Gemini y devuelve los
 * datos estructurados. Requiere GEMINI_API_KEY; GEMINI_MODEL es opcional y
 * admite varios modelos separados por coma, en orden de preferencia.
 */
export async function readTranscriptWithAi(
  buffer: Buffer,
  mimeType: string,
): Promise<TranscriptPreviewDto> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new ServiceUnavailableException(
      'La lectura de imágenes y PDF escaneados no está configurada (falta GEMINI_API_KEY).',
    );
  }
  const models = (process.env.GEMINI_MODEL || DEFAULT_MODEL)
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);
  const body = JSON.stringify(buildRequest(buffer, mimeType));

  let lastError = '';
  for (const model of models) {
    const response = await callModel(model, apiKey, body);
    const failed = response instanceof Error;
    if (!failed && response.ok) {
      return toPreview(parseModelJson(await response.json()));
    }
    lastError = failed
      ? `${model} sin respuesta: ${response.message}`
      : `${model} HTTP ${response.status}: ${await response.text()}`;
    const retryable = failed || FALLBACK_STATUS.has(response.status);
    if (!retryable || model === models[models.length - 1]) break;
    Logger.warn(`${lastError}; se intenta el siguiente modelo`, LOG_CONTEXT);
  }
  return failure(lastError);
}

/** Llama a un modelo; los errores de red o timeout se devuelven en vez de lanzarse. */
function callModel(
  model: string,
  apiKey: string,
  body: string,
): Promise<Response | Error> {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  ).catch((error: Error) => error);
}

/** Cuerpo de generateContent: archivo en base64, instrucciones y salida JSON con esquema. */
function buildRequest(buffer: Buffer, mimeType: string) {
  return {
    contents: [
      {
        parts: [
          { inlineData: { mimeType, data: buffer.toString('base64') } },
          { text: PROMPT },
        ],
      },
    ],
    generationConfig: {
      temperature: 0,
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
    },
  };
}

/** Une el texto de la respuesta (sin partes de razonamiento) y lo interpreta como JSON. */
function parseModelJson(body: any): any {
  const text = (body?.candidates?.[0]?.content?.parts ?? [])
    .filter((part: any) => !part.thought && part.text)
    .map((part: any) => part.text)
    .join('');
  try {
    return JSON.parse(text);
  } catch {
    return failure(`respuesta no es JSON: ${text.slice(0, 200)}`);
  }
}

/**
 * Normaliza la salida del modelo al formato de la vista previa. Descarta la
 * escala que indique el modelo si alguna nota la supera.
 */
function toPreview(raw: any): TranscriptPreviewDto {
  const grades = toGrades(raw?.grades);
  if (!grades.length) {
    throw new BadRequestException(
      'No se reconocieron asignaturas en el documento.',
    );
  }
  const highest = Math.max(0, ...grades.map((grade) => grade.grade ?? 0));
  const validScale = raw.maxGrade > 0 && raw.maxGrade >= highest;
  return {
    idDocument: raw.idDocument?.replace(/\D/g, '') || undefined,
    studentName: text(raw.studentName),
    title: text(raw.title),
    institution: text(raw.institution),
    maxGrade: validScale ? raw.maxGrade : detectMaxGrade(grades),
    minPassingGrade: positive(raw.minPassingGrade),
    average: positive(raw.average),
    approvedCredits: positive(raw.approvedCredits),
    classRank: positive(raw.classRank),
    classSize: positive(raw.classSize),
    classAverage: positive(raw.classAverage),
    graduationDate: /^\d{4}-\d{2}-\d{2}$/.test(raw.graduationDate)
      ? raw.graduationDate
      : undefined,
    onlyPassingGrades: raw.onlyPassingGrades === true || undefined,
    periods: toPeriods(raw.periods),
    grades,
  };
}

/** Asignaturas con nombre, con los textos recortados y los valores inválidos descartados. */
function toGrades(items: any[] = []): TeacherGradeDto[] {
  return items
    .filter((grade) => text(grade?.subjectName))
    .map((grade) => ({
      code: text(grade.code),
      subjectName: text(grade.subjectName),
      period: text(grade.period),
      grade: typeof grade.grade === 'number' ? grade.grade : undefined,
      remark: text(grade.remark),
      credits: positive(grade.credits),
      makeup: grade.makeup === true,
    }));
}

/** Períodos con código y su resumen (fechas, promedio y créditos) si el modelo lo leyó. */
function toPeriods(items: any[] = []): TeacherDegreePeriodDto[] {
  return items
    .filter((period) => text(period?.code))
    .map((period) => ({
      code: text(period.code),
      label: text(period.label),
      average: positive(period.average),
      approvedCredits: positive(period.approvedCredits),
    }));
}

/** Texto recortado; `undefined` si no es texto o queda vacío. */
function text(value: unknown): string | undefined {
  return typeof value === 'string' ? value.trim() || undefined : undefined;
}

/** Número mayor que cero; `undefined` en otro caso. */
function positive(value: unknown): number | undefined {
  return typeof value === 'number' && value > 0 ? value : undefined;
}

/** Registra el detalle técnico y responde al cliente con un mensaje genérico (503). */
function failure(detail: string): never {
  Logger.error(`Gemini: ${detail}`, LOG_CONTEXT);
  throw new ServiceUnavailableException(
    'No se pudo leer el documento con IA; intente de nuevo o registre las notas manualmente.',
  );
}
