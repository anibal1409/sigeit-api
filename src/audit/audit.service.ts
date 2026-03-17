import { Repository } from 'typeorm';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuditLog } from './entities';
import {
  EntityAuditHistoryDto,
  GetAuditLogsDto,
  ResponseAuditLogDto,
} from './dto';
import { AuditAction } from './enum';

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

  /**
   * Guarda un registro de auditoría; errores se registran sin propagar.
   */
  async recordSafe(params: CreateAuditEntryParams): Promise<void> {
    try {
      const row = this.repository.create(params);
      await this.repository.save(row);
    } catch (e) {
      this.logger.warn(`No se pudo guardar auditoría: ${String(e)}`);
    }
  }

  /**
   * Lista registros de auditoría paginados (más recientes primero).
   */
  async findPage(query: GetAuditLogsDto): Promise<{
    items: ResponseAuditLogDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const [rows, total] = await this.repository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const items = rows.map((r) => this.toResponseDto(r));
    return { items, total, page, limit };
  }

  private static readonly RESOURCE_PATTERN = /^[a-z][a-z0-9-]*$/i;

  /**
   * Historial de auditoría donde el recurso e id coinciden (p. ej. period + 5).
   */
  async findByEntity(
    resource: string,
    entityId: number,
  ): Promise<EntityAuditHistoryDto> {
    const r = resource.trim().toLowerCase();
    if (!AuditService.RESOURCE_PATTERN.test(r)) {
      throw new BadRequestException(
        'resource debe ser alfanumérico con guiones (ej. period, section).',
      );
    }
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
