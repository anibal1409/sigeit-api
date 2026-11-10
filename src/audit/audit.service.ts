import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuditLog } from './entities';
import {
  AuditLogFiltersDto,
  AuditStatsDto,
  EntityAuditHistoryDto,
  GetAuditLogsDto,
  ResponseAuditLogDto,
} from './dto';
import { AuditAction } from './enum';
import { buildAuditPdfReport } from './audit-pdf.report';
import { GetAuditReportDto } from './dto/get-audit-report.dto';
import { applyAuditLogFilters } from './utils/audit-log-query.util';

export interface CreateAuditEntryParams {
  userId: string | null;
  userEmail: string | null;
  action: AuditAction;
  resource: string;
  resourceId: string | null;
  httpMethod: string;
  path: string;
  ipAddress: string | null;
  userAgent: string | null;
  clientSummary: string | null;
  payloadSnippet: string | null;
  propertyChangesJson: string | null;
  statusCode: number;
  success: boolean;
}

/**
 * Persistencia y consulta de registros de auditoría.
 */
@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  /** Guarda un registro de auditoría; errores se registran sin propagar. */
  async recordSafe(params: CreateAuditEntryParams): Promise<void> {
    try {
      const row = this.repository.create(params);
      await this.repository.save(row);
    } catch (e) {
      this.logger.warn(`No se pudo guardar auditoría: ${String(e)}`);
    }
  }

  /** Lista registros paginados con filtros (más recientes primero). */
  async findPage(query: GetAuditLogsDto): Promise<{
    items: ResponseAuditLogDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const qb = this.filteredQuery(query);
    const [rows, total] = await qb
      .orderBy('log.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return {
      items: rows.map((r) => this.toResponseDto(r)),
      total,
      page,
      limit,
    };
  }

  /** Un registro por id. */
  async findOne(id: number): Promise<ResponseAuditLogDto> {
    const row = await this.repository.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('Audit log not found');
    }
    return this.toResponseDto(row);
  }

  /** Agregados para KPIs y gráficos con los mismos filtros que el listado. */
  async findStats(filters: AuditLogFiltersDto): Promise<AuditStatsDto> {
    const base = this.filteredQuery(filters);
    const totalEvents = await base.clone().getCount();
    const successCount = await base
      .clone()
      .andWhere('log.success = :ok', { ok: true })
      .getCount();
    const failureCount = totalEvents - successCount;
    const distinctActors = await this.countDistinctActors(filters);
    const byAction = await this.aggregateByAction(filters);
    const byResource = await this.aggregateByResource(filters);
    const byDay = await this.aggregateByDay(filters);
    return {
      totalEvents,
      successCount,
      failureCount,
      distinctActors,
      byAction,
      byResource,
      byDay,
    };
  }

  /** Filas para reporte PDF (más recientes primero, con tope). */
  async findRowsForReport(
    filters: AuditLogFiltersDto,
    maxRows: number,
  ): Promise<ResponseAuditLogDto[]> {
    const rows = await this.filteredQuery(filters)
      .orderBy('log.createdAt', 'DESC')
      .take(maxRows)
      .getMany();
    return rows.map((row) => this.toResponseDto(row));
  }

  /** PDF con resumen estadístico y detalle de eventos según filtros. */
  async buildPdfReport(query: GetAuditReportDto): Promise<Buffer> {
    const { maxRows = 500, ...filters } = query;
    const stats = await this.findStats(filters);
    const rows = await this.findRowsForReport(filters, maxRows);
    return buildAuditPdfReport(filters, stats, rows, maxRows);
  }

  /** Historial donde el recurso e id coinciden (p. ej. period + 5). */
  async findByEntity(
    resource: string,
    entityId: number,
  ): Promise<EntityAuditHistoryDto> {
    const r = this.normalizeResource(resource);
    const idStr = String(entityId);
    const rows = await this.repository.find({
      where: { resource: r, resourceId: idStr },
      order: { createdAt: 'DESC' },
    });
    return {
      resource: r,
      entityId,
      records: rows.map((row) => this.toResponseDto(row)),
    };
  }

  private filteredQuery(filters: AuditLogFiltersDto) {
    const qb = this.repository.createQueryBuilder('log');
    applyAuditLogFilters(qb, filters);
    return qb;
  }

  private normalizeResource(resource: string): string {
    const r = resource.trim().toLowerCase();
    if (!/^[a-z][a-z0-9-]*$/.test(r)) {
      throw new BadRequestException(
        'resource debe ser alfanumérico con guiones (ej. period, section).',
      );
    }
    return r;
  }

  private async countDistinctActors(
    filters: AuditLogFiltersDto,
  ): Promise<number> {
    const raw = await this.filteredQuery(filters)
      .select(
        "COUNT(DISTINCT COALESCE(log.userId, log.userEmail, 'anonymous'))",
        'cnt',
      )
      .getRawOne<{ cnt: string }>();
    return Number(raw?.cnt ?? 0);
  }

  private async aggregateByAction(filters: AuditLogFiltersDto) {
    const rows = await this.filteredQuery(filters)
      .select('log.action', 'action')
      .addSelect('COUNT(*)', 'count')
      .groupBy('log.action')
      .orderBy('count', 'DESC')
      .getRawMany<{ action: AuditAction; count: string }>();
    return rows.map((r) => ({
      action: r.action,
      count: Number(r.count),
    }));
  }

  private async aggregateByResource(filters: AuditLogFiltersDto) {
    const rows = await this.filteredQuery(filters)
      .select('log.resource', 'resource')
      .addSelect('COUNT(*)', 'count')
      .groupBy('log.resource')
      .orderBy('count', 'DESC')
      .limit(20)
      .getRawMany<{ resource: string; count: string }>();
    return rows.map((r) => ({
      resource: r.resource,
      count: Number(r.count),
    }));
  }

  private async aggregateByDay(filters: AuditLogFiltersDto) {
    const rows = await this.filteredQuery(filters)
      .select(`TO_CHAR(log."createdAt", 'YYYY-MM-DD')`, 'date')
      .addSelect('COUNT(*)', 'count')
      .groupBy(`TO_CHAR(log."createdAt", 'YYYY-MM-DD')`)
      .orderBy('date', 'ASC')
      .limit(90)
      .getRawMany<{ date: string; count: string }>();
    return rows.map((r) => ({
      date: r.date,
      count: Number(r.count),
    }));
  }

  private toResponseDto(r: AuditLog): ResponseAuditLogDto {
    let propertyChanges: Record<string, unknown> | null = null;
    if (r.propertyChangesJson) {
      try {
        propertyChanges = JSON.parse(r.propertyChangesJson) as Record<
          string,
          unknown
        >;
      } catch {
        propertyChanges = null;
      }
    }
    return {
      id: r.id,
      userId: r.userId,
      userEmail: r.userEmail,
      action: r.action as AuditAction,
      resource: r.resource,
      resourceId: r.resourceId,
      httpMethod: r.httpMethod,
      path: r.path,
      ipAddress: r.ipAddress,
      userAgent: r.userAgent,
      clientSummary: r.clientSummary,
      payloadSnippet: r.payloadSnippet,
      propertyChanges,
      statusCode: r.statusCode,
      success: r.success,
      createdAt: r.createdAt,
    };
  }
}
