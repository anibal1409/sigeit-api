import pdfParse from 'pdf-parse/lib/pdf-parse.js';

import { BadRequestException } from '@nestjs/common';

import {
  TeacherDegreePeriodDto,
  TeacherGradeDto,
  TranscriptPreviewDto,
} from './dto';

/**
 * Fila de asignatura del récord de la UDO. pdf-parse puede pegar las columnas,
 * así que los espacios entre ellas son opcionales:
 * "0081814Matemáticas I4805CINCOF" → código, nombre, sección, nota, nota en
 * letras (o resultado: RETIRADA, APROBADO...) y tipo de examen (F final, R reparación).
 */
const GRADE_ROW =
  /^(\d{7})\s*(.+?)\s*\d{2}\s*(\d{2}|[A-Z]{2})\s*([A-ZÁÉÍÓÚÑ ]+?)\s*([A-Z])$/;
/** "- Período: 2013-1 (Mar - Dic 2013)" → código y fechas. */
const PERIOD_ROW = /Per[ií]odo:\s*(\S+)\s*(?:\((.+?)\))?/;
/** Resumen al pie de cada período: créditos aprobados y promedio. */
const PERIOD_SUMMARY =
  /Cr[ée]d\.\s*Aprob\.:\s*(\d+).*Prom\.\s*Gen\.:\s*([\d.]+)/;
/** Promedio del resumen final; puede quedar en la línea siguiente al rótulo. */
const OVERALL_AVERAGE = /Promedio General de Notas:\s*([\d.,]+)/;
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
  const { grades, periods } = readPeriods(lines);
  const find = (pattern: RegExp) =>
    lines.map((line) => line.match(pattern)).find(Boolean);
  const average = text.match(OVERALL_AVERAGE)?.[1].replace(',', '.');
  const credits = periods
    .map((period) => period.approvedCredits)
    .filter((value) => value !== undefined);
  return {
    idDocument: find(ID_DOCUMENT)?.[1].replace(/\D/g, ''),
    studentName: find(STUDENT_NAME)?.[1].trim(),
    title: find(PROGRAM)?.[1],
    institution: find(INSTITUTION)?.[0],
    maxGrade: detectMaxGrade(grades),
    average: average ? Number(average) : undefined,
    approvedCredits: credits.length
      ? credits.reduce((sum, value) => sum + value, 0)
      : undefined,
    periods,
    grades,
  };
}

/** Escala probable cuando el documento no la indica: 20 si alguna nota pasa de 10. */
export function detectMaxGrade(grades: TeacherGradeDto[]): number {
  return grades.some((grade) => grade.grade > 10) ? 20 : 10;
}

/** Recorre las líneas agrupando las notas por período y leyendo el resumen de cada uno. */
function readPeriods(lines: string[]): {
  grades: TeacherGradeDto[];
  periods: TeacherDegreePeriodDto[];
} {
  const grades: TeacherGradeDto[] = [];
  const periods: TeacherDegreePeriodDto[] = [];
  for (const line of lines) {
    const current = periods[periods.length - 1];
    const period = line.match(PERIOD_ROW);
    const row = line.match(GRADE_ROW);
    const summary = line.match(PERIOD_SUMMARY);
    if (period) {
      periods.push({
        code: period[1],
        label: period[2]?.replace(/\s+/g, ' ').trim(),
      });
    } else if (row) {
      grades.push(toGrade(row, current?.code));
    } else if (summary && current) {
      current.approvedCredits = Number(summary[1]);
      current.average = Number(summary[2]) || undefined;
    }
  }
  return { grades, periods };
}

/** Convierte una fila reconocida en nota; los resultados sin número van a `remark`. */
function toGrade(row: RegExpMatchArray, period?: string): TeacherGradeDto {
  const [, code, subjectName, grade, words, exam] = row;
  const numeric = /^\d+$/.test(grade);
  return {
    code,
    subjectName,
    period,
    grade: numeric ? Number(grade) : undefined,
    remark: numeric ? undefined : words.trim(),
    makeup: exam === 'R',
  };
}
