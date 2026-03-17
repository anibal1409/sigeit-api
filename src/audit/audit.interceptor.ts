import { Observable, from, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { AuditCaptureService } from './audit-capture.service';
import { AuditDiffService } from './audit-diff.service';
import {
  parseAuthResource,
  parseResourceFromPath,
  shouldAuditRequest,
} from './utils/audit-path.util';

interface RequestUser {
  userId?: string;
  username?: string;
}

/**
 * Interceptor global: carga snapshot antes de PATCH/PUT, luego persiste auditoría.
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly capture: AuditCaptureService,
    private readonly diff: AuditDiffService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<{
      method: string;
      originalUrl: string;
      path: string;
      body: unknown;
      ip?: string;
      headers: { 'user-agent'?: string };
      user?: RequestUser & { id?: number; email?: string };
      cookies?: { 'sigeit-cookie'?: { id?: number } };
    }>();
    const res = ctx.getResponse<{ statusCode: number }>();
    const rawPath = req.originalUrl || req.path || '';

    if (!shouldAuditRequest(req.method, rawPath)) {
      return next.handle();
    }

    const normalized =
      rawPath.startsWith('/api')
        ? rawPath.split('?')[0]
        : `/api${rawPath.split('?')[0]}`;
    const onAuth = normalized.startsWith('/api/auth');
    const { resource, resourceId } = onAuth
      ? parseAuthResource(rawPath)
      : parseResourceFromPath(rawPath);

    const needSnapshot = this.capture.needsEntitySnapshot(
      req.method,
      onAuth,
      resourceId,
    );
    const snapshot$ = needSnapshot
      ? from(
          this.diff.getEntitySnapshot(resource, parseInt(resourceId!, 10)),
        ).pipe(catchError(() => of(null)))
      : of(null);

    return snapshot$.pipe(
      switchMap((snapshot) =>
        next.handle().pipe(
          finalize(() => {
            void this.capture.persistAudit(req, res, snapshot);
          }),
        ),
      ),
    );
  }
}
