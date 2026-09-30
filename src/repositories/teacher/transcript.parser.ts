import pdfParse from 'pdf-parse/lib/pdf-parse.js';

import { BadRequestException } from '@nestjs/common';

import { TeacherGradeDto, TranscriptPreviewDto } from './dto';

/**
 * Fila de asignatura del récord de la UDO. pdf-parse puede pegar las columnas,
 * así que los espacios entre ellas son opcionales:
 * "0081814Matemáticas I4805CINCOF" → código, nombre, sección, nota, nota en
 * letras (o resultado: RETIRADA, APROBADO...) y tipo de examen.
 */
const GRADE_ROW =
  /^(\d{7})\s*(.+?)\s*\d{2}\s*(\d{2}|[A-Z]{2})\s*([A-ZÁÉÍÓÚÑ ]+?)\s*[A-Z]$/;
const PERIOD_ROW = /Per[ií]odo:\s*(\S+)/;
const ID_DOCUMENT = /C[ée]dula de Identidad:?\s*([\d.]+)/;
const STUDENT_NAME = /Br\.:\s*([^;]+);/;
const PROGRAM = /especialidad:\s*(.+?)\.?\s*$/;
const INSTITUTION = /^(Universidad|Instituto)\b.*/;

/** Texto de un PDF; vacío si es escaneado (solo imágenes). */
export async function extractPdfText(buffer: Buffer): Promise<string> {
  const { text } = await pdfParse(buffer).catch(() => {
    throw new BadRequestException('No se pudo leer el PDF.');
  });
  return text;
}

/** Interpreta el texto de un récord de notas de la UDO línea por línea. */
export function parseTranscriptText(text: string): TranscriptPreviewDto {
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const grades: TeacherGradeDto[] = [];
  let period: string | undefined;

  for (const line of lines) {
    period = line.match(PERIOD_ROW)?.[1] ?? period;
    const row = line.match(GRADE_ROW);
    if (row) grades.push(toGrade(row, period));
  }

  const find = (pattern: RegExp) =>
    lines.map((line) => line.match(pattern)).find(Boolean);
  return {
    idDocument: find(ID_DOCUMENT)?.[1].replace(/\D/g, ''),
    studentName: find(STUDENT_NAME)?.[1].trim(),
    title: find(PROGRAM)?.[1],
    institution: find(INSTITUTION)?.[0],
    maxGrade: detectMaxGrade(grades),
    grades,
  };
}

/** Escala probable cuando el documento no la indica: 20 si alguna nota pasa de 10. */
export function detectMaxGrade(grades: TeacherGradeDto[]): number {
  return grades.some((grade) => grade.grade > 10) ? 20 : 10;
}

/** Convierte una fila reconocida en nota; los resultados sin número van a `remark`. */
function toGrade(row: RegExpMatchArray, period?: string): TeacherGradeDto {
  const [, code, subjectName, grade, words] = row;
  const numeric = /^\d+$/.test(grade);
  return {
    code,
    subjectName,
    period,
    grade: numeric ? Number(grade) : undefined,
    remark: numeric ? undefined : words.trim(),
  };
}
