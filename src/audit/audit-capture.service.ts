import { Injectable } from '@nestjs/common';

import { AuditService } from './audit.service';
import { extractAuthAuditUser } from './utils/auth-audit-context.util';
import {
  maskSensitivePath,
  parseAuthResource,
  parseResourceFromPath,
  resolveAuditAction,
} from './utils/audit-path.util';
import {
  buildCreateFieldSummary,
  buildPropertyChangeMap,
  stringifyPropertyChanges,
} from './utils/property-diff.util';
import { sanitizeRequestBody } from './utils/sanitize-payload.util';
import {
  summarizeUserAgent,
  truncateUserAgent,
} from './utils/user-agent-summary.util';

interface AuditRequestShape {
  method: string;
  originalUrl: string;
  path: string;
  body: unknown;
  ip?: string;
  headers: { 'user-agent'?: string };
  user?: {
    userId?: string;
    username?: string;
    id?: number;
    email?: string;
  };
  cookies?: { 'sigeit-cookie'?: { id?: number } };
}

/**
 * Arma y persiste el registro de auditoría al finalizar la petición.
 */
@Injectable()
export class AuditCaptureService {
  constructor(private readonly auditService: AuditService) {}

  /** Indica si hace falta leer la entidad antes del handler (PATCH/PUT con id numérico). */
  needsEntitySnapshot(
    method: string,
    onAuth: boolean,
    resourceId: string | null,
  ): boolean {
    const m = method.toUpperCase();
    if (onAuth || (m !== 'PATCH' && m !== 'PUT')) return false;
    return !!(resourceId && /^\d+$/.test(resourceId));
  }

  /**
   * Persiste el log; debe llamarse en finalize (snapshot = estado previo en updates).
   */
  async persistAudit(
    req: AuditRequestShape,
    res: { statusCode: number },
    entitySnapshot: Record<string, unknown> | null,
  ): Promise<void> {
    const rawPath = req.originalUrl || req.path || '';
    const normalized =
      rawPath.startsWith('/api')
        ? rawPath.split('?')[0]
        : `/api${rawPath.split('?')[0]}`;
    const onAuth = normalized.startsWith('/api/auth');
    const { resource, resourceId } = onAuth
      ? parseAuthResource(rawPath)
      : parseResourceFromPath(rawPath);
    const userCtx = onAuth
      ? extractAuthAuditUser(req)
      : {
          userId:
            req.user?.userId != null
              ? String(req.user.userId)
              : req.cookies?.['sigeit-cookie']?.id != null
                ? String(req.cookies['sigeit-cookie'].id)
                : null,
          userEmail: req.user?.username ?? null,
        };
    const statusCode = res.statusCode ?? 500;
    const success = statusCode >= 200 && statusCode < 400;
    const uaHeader = req.headers['user-agent'];
    const propertyJson = this.resolvePropertyChangesJson(
      req.method,
      success,
      onAuth,
      entitySnapshot,
      req.body,
      resourceId,
    );
    await this.auditService.recordSafe({
      userId: userCtx.userId,
      userEmail: userCtx.userEmail,
      action: resolveAuditAction(req.method, rawPath),
      resource,
      resourceId,
      httpMethod: req.method.toUpperCase(),
      path: maskSensitivePath(rawPath),
      ipAddress: req.ip ?? null,
      userAgent: truncateUserAgent(uaHeader),
      clientSummary: summarizeUserAgent(uaHeader),
      payloadSnippet: sanitizeRequestBody(req.body),
      propertyChangesJson: propertyJson,
      statusCode,
      success,
    });
  }

  private resolvePropertyChangesJson(
    method: string,
    success: boolean,
    onAuth: boolean,
    snapshot: Record<string, unknown> | null,
    body: unknown,
    resourceId: string | null,
  ): string | null {
    if (!success || onAuth) return null;
    const m = method.toUpperCase();
    if (m === 'PATCH' || m === 'PUT') {
      const map = buildPropertyChangeMap(snapshot, body);
      if (map) return stringifyPropertyChanges(map);
      if (!snapshot && body && typeof body === 'object' && !Array.isArray(body)) {
        const keys = Object.keys(body).filter((k) => !/password|token/i.test(k));
        return stringifyPropertyChanges({
          partialComparison: true,
          fieldsSubmitted: keys,
        });
      }
      return null;
    }
    if (m === 'POST' && (!resourceId || !/^\d+$/.test(resourceId))) {
      const summary = buildCreateFieldSummary(body);
      return stringifyPropertyChanges(summary);
    }
    return null;
  }
}
