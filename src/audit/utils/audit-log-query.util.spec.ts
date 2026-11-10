import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AuditLogFiltersDto } from '../dto/audit-log-filters.dto';
import { AuditLog } from '../entities';
import { AuditAction } from '../enum';
import { applyAuditLogFilters } from './audit-log-query.util';

describe('applyAuditLogFilters', () => {
  it('rejects invalid actions list', () => {
    const repo = {
      createQueryBuilder: () => ({
        andWhere: jest.fn().mockReturnThis(),
      }),
    } as unknown as Repository<AuditLog>;
    const qb = repo.createQueryBuilder('log');
    const filters: AuditLogFiltersDto = { actions: 'CREATE,NOT_REAL' };
    expect(() => applyAuditLogFilters(qb, filters)).toThrow(BadRequestException);
  });

  it('applies single action filter', () => {
    const calls: string[] = [];
    const qb = {
      andWhere: jest.fn((sql: string) => {
        calls.push(sql);
        return qb;
      }),
    };
    applyAuditLogFilters(qb as never, { action: AuditAction.Create });
    expect(calls.some((c) => c.includes('action'))).toBe(true);
  });
});
