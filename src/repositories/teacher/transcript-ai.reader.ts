import {
  BadRequestException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

import { TranscriptPreviewDto } from './dto';
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
const PROMPT = `Extrae los datos de este récord o constancia de notas académicas.
- Una entrada en "grades" por cada asignatura cursada, en el orden del documento.
- "grade": nota definitiva numérica. Si el resultado no es numérico (retirada, aprobado, en ejecución, equivalencia...), deja "grade" en null y escribe el resultado en "remark".
- "period": solo el código del período académico, sin rango de fechas ni descripción (p. ej. "2015-1", no "2015-1 (Mar - Jul 2015)").
- "title": carrera, especialidad o programa; "institution": universidad o instituto.
- "maxGrade": nota máxima de la escala; si el documento no la indica, usa 10 si todas las notas son 10 o menos, y 20 en caso contrario.
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
  const grades = (raw?.grades ?? [])
    .filter((grade: any) => grade?.subjectName?.trim())
    .map((grade: any) => ({
      code: grade.code?.trim() || undefined,
      subjectName: grade.subjectName.trim(),
      period: grade.period?.trim() || undefined,
      grade: typeof grade.grade === 'number' ? grade.grade : undefined,
      remark: grade.remark?.trim() || undefined,
    }));
  if (!grades.length) {
    throw new BadRequestException(
      'No se reconocieron asignaturas en el documento.',
    );
  }
  const highest = Math.max(0, ...grades.map((grade) => grade.grade ?? 0));
  const validScale = raw.maxGrade > 0 && raw.maxGrade >= highest;
  return {
    idDocument: raw.idDocument?.replace(/\D/g, '') || undefined,
    studentName: raw.studentName?.trim() || undefined,
    title: raw.title?.trim() || undefined,
    institution: raw.institution?.trim() || undefined,
    maxGrade: validScale ? raw.maxGrade : detectMaxGrade(grades),
    grades,
  };
}

/** Registra el detalle técnico y responde al cliente con un mensaje genérico (503). */
function failure(detail: string): never {
  Logger.error(`Gemini: ${detail}`, LOG_CONTEXT);
  throw new ServiceUnavailableException(
    'No se pudo leer el documento con IA; intente de nuevo o registre las notas manualmente.',
  );
}
