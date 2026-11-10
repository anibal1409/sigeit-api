import { buildAuditPdfReport } from './audit-pdf.report';
import { AuditStatsDto } from './dto/audit-stats.dto';
import { ResponseAuditLogDto } from './dto/response-audit-log.dto';
import { AuditAction } from './enum';

describe('buildAuditPdfReport', () => {
  it('returns a non-empty PDF buffer', async () => {
    const stats: AuditStatsDto = {
      totalEvents: 1,
      successCount: 1,
      failureCount: 0,
      distinctActors: 1,
      byAction: [{ action: AuditAction.Create, count: 1 }],
      byResource: [{ resource: 'subject', count: 1 }],
      byDay: [{ date: '2026-01-01', count: 1 }],
    };
    const buffer = await buildAuditPdfReport(
      {},
      stats,
      [
        {
          id: 1,
          userId: null,
          userEmail: 'admin@test.com',
          action: AuditAction.Create,
          resource: 'subject',
          resourceId: '1',
          httpMethod: 'POST',
          path: '/api/subject',
          ipAddress: null,
          userAgent: null,
          clientSummary: null,
          payloadSnippet: null,
          propertyChanges: null,
          statusCode: 201,
          success: true,
          createdAt: new Date('2026-01-01T12:00:00Z'),
        } satisfies ResponseAuditLogDto,
      ],
      500,
    );
    expect(buffer.length).toBeGreaterThan(100);
    expect(buffer.subarray(0, 4).toString()).toBe('%PDF');
  });
});
