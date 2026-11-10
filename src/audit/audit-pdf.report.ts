import PDFDocument from 'pdfkit';

import { AuditLogFiltersDto } from './dto/audit-log-filters.dto';
import { AuditStatsDto } from './dto/audit-stats.dto';
import { ResponseAuditLogDto } from './dto/response-audit-log.dto';
import { AuditAction } from './enum';

const ACTION_LABEL: Record<AuditAction, string> = {
  [AuditAction.Create]: 'Creación',
  [AuditAction.Update]: 'Actualización',
  [AuditAction.Delete]: 'Eliminación',
  [AuditAction.Other]: 'Otra',
  [AuditAction.AuthLogin]: 'Inicio de sesión',
  [AuditAction.AuthLogout]: 'Cierre de sesión',
  [AuditAction.AuthRecoveryRequest]: 'Recuperación (solicitud)',
  [AuditAction.AuthRecoveryValidate]: 'Recuperación (validar)',
  [AuditAction.AuthRecoveryComplete]: 'Recuperación (completar)',
  [AuditAction.AuthChangePassword]: 'Cambio de contraseña',
  [AuditAction.AuthRegisterPublic]: 'Registro público',
  [AuditAction.AuthOther]: 'Auth (otro)',
};

/** Genera el buffer PDF del reporte de auditoría. */
export async function buildAuditPdfReport(
  filters: AuditLogFiltersDto,
  stats: AuditStatsDto,
  rows: ResponseAuditLogDto[],
  maxRows: number,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    writeHeader(doc);
    writeFilterSummary(doc, filters);
    writeStats(doc, stats);
    writeActionBreakdown(doc, stats);
    writeEventTable(doc, rows, stats.totalEvents, maxRows);
    doc.end();
  });
}

type PdfDoc = InstanceType<typeof PDFDocument>;

function writeHeader(doc: PdfDoc): void {
  doc.fontSize(16).text('Reporte de auditoría — SIGEIT', { align: 'center' });
  doc
    .fontSize(9)
    .fillColor('#555')
    .text(`Generado: ${new Date().toISOString()}`, { align: 'center' });
  doc.moveDown();
  doc.fillColor('#000');
}

function writeFilterSummary(doc: PdfDoc, filters: AuditLogFiltersDto): void {
  doc.fontSize(11).text('Criterios aplicados', { underline: true });
  doc.fontSize(9);
  const lines = describeFilters(filters);
  if (lines.length === 0) {
    doc.text('Sin filtros (todos los eventos).');
  } else {
    lines.forEach((line) => doc.text(`• ${line}`));
  }
  doc.moveDown();
}

function writeStats(doc: PdfDoc, stats: AuditStatsDto): void {
  doc.fontSize(11).text('Resumen', { underline: true });
  doc.fontSize(9);
  doc.text(`Total de eventos: ${stats.totalEvents}`);
  doc.text(`Exitosos: ${stats.successCount} | Fallidos: ${stats.failureCount}`);
  doc.text(`Actores distintos: ${stats.distinctActors}`);
  doc.moveDown();
}

function writeActionBreakdown(doc: PdfDoc, stats: AuditStatsDto): void {
  if (stats.byAction.length === 0) {
    return;
  }
  doc.fontSize(11).text('Por tipo de acción', { underline: true });
  doc.fontSize(9);
  stats.byAction.slice(0, 12).forEach((item) => {
    const label = ACTION_LABEL[item.action] ?? item.action;
    doc.text(`${label}: ${item.count}`);
  });
  doc.moveDown();
}

function writeEventTable(
  doc: PdfDoc,
  rows: ResponseAuditLogDto[],
  totalMatching: number,
  maxRows: number,
): void {
  doc.fontSize(11).text('Detalle de eventos', { underline: true });
  doc.fontSize(8);
  if (totalMatching > rows.length) {
    doc.text(
      `Mostrando ${rows.length} de ${totalMatching} (límite ${maxRows}).`,
    );
  } else {
    doc.text(`Registros incluidos: ${rows.length}.`);
  }
  doc.moveDown(0.5);
  rows.forEach((row, index) => {
    if (doc.y > 720) {
      doc.addPage();
    }
    const user = row.userEmail ?? row.userId ?? '—';
    const action = ACTION_LABEL[row.action] ?? row.action;
    const resource = `${row.resource}${row.resourceId ? `#${row.resourceId}` : ''}`;
    const line =
      `${index + 1}. ${formatDate(row.createdAt)} | ${user} | ${action} | ` +
      `${resource} | ${row.success ? 'OK' : 'Error'} (${row.statusCode})`;
    doc.text(line, { width: 520 });
  });
}

function describeFilters(filters: AuditLogFiltersDto): string[] {
  const lines: string[] = [];
  if (filters.userId) lines.push(`Usuario id: ${filters.userId}`);
  if (filters.userEmail) lines.push(`Correo contiene: ${filters.userEmail}`);
  if (filters.actions) lines.push(`Acciones: ${filters.actions}`);
  else if (filters.action) lines.push(`Acción: ${filters.action}`);
  if (filters.resource) lines.push(`Recurso: ${filters.resource}`);
  if (filters.resourceId) lines.push(`Id recurso: ${filters.resourceId}`);
  if (filters.success === true) lines.push('Solo exitosos');
  if (filters.success === false) lines.push('Solo fallidos');
  if (filters.httpMethod) lines.push(`Método HTTP: ${filters.httpMethod}`);
  if (filters.from) lines.push(`Desde: ${filters.from}`);
  if (filters.to) lines.push(`Hasta: ${filters.to}`);
  if (filters.search) lines.push(`Búsqueda: ${filters.search}`);
  if (filters.authOnly) lines.push('Solo autenticación');
  return lines;
}

function formatDate(value: Date | string): string {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toISOString();
}
