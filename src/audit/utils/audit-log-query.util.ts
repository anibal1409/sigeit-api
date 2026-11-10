import { Brackets, SelectQueryBuilder } from 'typeorm';

import { BadRequestException } from '@nestjs/common';

import { AuditLogFiltersDto } from '../dto/audit-log-filters.dto';
import { AuditLog } from '../entities';
import { AuditAction } from '../enum';

const AUTH_ACTIONS = Object.values(AuditAction).filter((a) =>
  a.startsWith('AUTH_'),
);

/** Aplica filtros de consulta sobre audit_log (parámetros enlazados, sin concatenar SQL). */
export function applyAuditLogFilters(
  qb: SelectQueryBuilder<AuditLog>,
  filters: AuditLogFiltersDto,
  alias = 'log',
): void {
  if (filters.userId) {
    qb.andWhere(`${alias}.userId = :userId`, { userId: filters.userId });
  }
  if (filters.userEmail) {
    qb.andWhere(`${alias}.userEmail ILIKE :userEmail`, {
      userEmail: `%${escapeLike(filters.userEmail)}%`,
    });
  }
  if (filters.actions) {
    const list = parseActionList(filters.actions);
    qb.andWhere(`${alias}.action IN (:...actions)`, { actions: list });
  } else if (filters.action) {
    qb.andWhere(`${alias}.action = :action`, { action: filters.action });
  }
  if (filters.resource) {
    qb.andWhere(`LOWER(${alias}.resource) = :resource`, {
      resource: filters.resource.trim().toLowerCase(),
    });
  }
  if (filters.resourceId) {
    qb.andWhere(`${alias}.resourceId = :resourceId`, {
      resourceId: filters.resourceId,
    });
  }
  if (filters.success === true) {
    qb.andWhere(`${alias}.success = :success`, { success: true });
  } else if (filters.success === false) {
    qb.andWhere(`${alias}.success = :success`, { success: false });
  }
  if (filters.httpMethod) {
    qb.andWhere(`UPPER(${alias}.httpMethod) = :httpMethod`, {
      httpMethod: filters.httpMethod.toUpperCase(),
    });
  }
  if (filters.from) {
    qb.andWhere(`${alias}.createdAt >= :from`, { from: new Date(filters.from) });
  }
  if (filters.to) {
    qb.andWhere(`${alias}.createdAt <= :to`, { to: new Date(filters.to) });
  }
  if (filters.search) {
    const term = `%${escapeLike(filters.search.trim())}%`;
    qb.andWhere(
      new Brackets((sub) => {
        sub
          .where(`${alias}.path ILIKE :search`, { search: term })
          .orWhere(`${alias}.userEmail ILIKE :search`, { search: term })
          .orWhere(`${alias}.ipAddress ILIKE :search`, { search: term })
          .orWhere(`${alias}.clientSummary ILIKE :search`, { search: term })
          .orWhere(`${alias}.resourceId ILIKE :search`, { search: term })
          .orWhere(`${alias}.resource ILIKE :search`, { search: term });
      }),
    );
  }
  if (filters.authOnly === true) {
    qb.andWhere(`${alias}.action IN (:...authActions)`, {
      authActions: AUTH_ACTIONS,
    });
  }
}

function parseActionList(raw: string): AuditAction[] {
  const parts = raw
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  const valid = new Set(Object.values(AuditAction));
  const resolved: AuditAction[] = [];
  for (const part of parts) {
    if (!valid.has(part as AuditAction)) {
      throw new BadRequestException(`Invalid audit action: ${part}`);
    }
    resolved.push(part as AuditAction);
  }
  if (resolved.length === 0) {
    throw new BadRequestException('actions cannot be empty');
  }
  return resolved;
}

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (ch) => `\\${ch}`);
}
