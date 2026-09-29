import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';

import { BadRequestException } from '@nestjs/common';

import { normalizeSubjectCode } from '../subject/subject-code';

/** Archivo recibido vía multipart (subconjunto de `Express.Multer.File`). */
export interface UploadedDemandFile {
  buffer: Buffer;
  originalname: string;
}

/** Fila válida del reporte de demanda. */
export interface DemandRow {
  code: string;
  level: number;
  quantity: number;
}

/** Resultado del parseo: filas válidas y números de fila descartados. */
export interface ParsedDemand {
  rows: DemandRow[];
  invalidRows: number[];
}

const REQUIRED_COLUMNS = ['CODIGO', 'NIVEL', 'CANTIDAD'] as const;
type RequiredColumn = (typeof REQUIRED_COLUMNS)[number];

/**
 * Lee el reporte de demanda (.xlsx, .csv o .tsv). Solo exige las columnas
 * CODIGO, NIVEL y CANTIDAD en la primera fila; el resto se ignora porque la
 * asignatura ya determina departamento y dirección.
 */
export async function parseDemandFile(
  file: UploadedDemandFile,
): Promise<ParsedDemand> {
  const sheet = await readFirstSheet(file);
  const columns = locateColumns(sheet.getRow(1));
  const parsed: ParsedDemand = { rows: [], invalidRows: [] };

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const code = normalizeSubjectCode(row.getCell(columns.CODIGO).text);
    const level = Number(row.getCell(columns.NIVEL).text);
    const quantity = Number(row.getCell(columns.CANTIDAD).text);
    const valid = code && isInteger(level, 1) && isInteger(quantity, 0);
    if (valid) {
      parsed.rows.push({ code, level, quantity });
    } else {
      parsed.invalidRows.push(rowNumber);
    }
  });

  return parsed;
}

async function readFirstSheet(
  file: UploadedDemandFile,
): Promise<ExcelJS.Worksheet> {
  const workbook = new ExcelJS.Workbook();
  if (/\.xlsx$/i.test(file.originalname)) {
    await workbook.xlsx.load(file.buffer as unknown as ExcelJS.Buffer);
  } else if (/\.(csv|tsv|txt)$/i.test(file.originalname)) {
    const text = file.buffer.toString('utf8');
    await workbook.csv.read(Readable.from([text]), {
      parserOptions: { delimiter: detectDelimiter(text) },
    });
  } else {
    throw new BadRequestException(
      'Formato no soportado: use .xlsx, .csv o .tsv.',
    );
  }

  const sheet = workbook.worksheets[0];
  if (!sheet || sheet.rowCount < 2) {
    throw new BadRequestException('El archivo no contiene datos.');
  }
  return sheet;
}

/** Elige el separador más frecuente en la cabecera (tab, punto y coma o coma). */
function detectDelimiter(text: string): string {
  const header = text.split(/\r?\n/, 1)[0];
  const count = (d: string) => header.split(d).length - 1;
  return ['\t', ';', ','].reduce((best, d) =>
    count(d) > count(best) ? d : best,
  );
}

function locateColumns(header: ExcelJS.Row): Record<RequiredColumn, number> {
  const positions = new Map<string, number>();
  header.eachCell((cell, col) =>
    positions.set(normalizeHeader(cell.text), col),
  );

  const missing = REQUIRED_COLUMNS.filter((name) => !positions.has(name));
  if (missing.length) {
    throw new BadRequestException(`Faltan columnas: ${missing.join(', ')}.`);
  }
  return Object.fromEntries(
    REQUIRED_COLUMNS.map((name) => [name, positions.get(name)]),
  ) as Record<RequiredColumn, number>;
}

/** Normaliza cabeceras: sin BOM, tildes ni espacios, en mayúsculas ("Código" → "CODIGO"). */
function normalizeHeader(text: string): string {
  return text
    .replace(/^\uFEFF/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase();
}

function isInteger(value: number, min: number): boolean {
  return Number.isInteger(value) && value >= min;
}
