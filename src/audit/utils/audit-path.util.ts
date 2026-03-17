import { AuditAction } from '../enum';

const MUTATING_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

function normalizePath(path: string): string {
  return path.startsWith('/api') ? path : `/api${path}`;
}

/** Rutas que no generan registro (evita ruido y bucles). */
const EXCLUDED_PREFIXES = ['/api/audit', '/api-docs'];

/**
 * Indica si la petición debe auditarse: mutaciones en general y todo lo de /api/auth.
 */
export function shouldAuditRequest(method: string, path: string): boolean {
  const n = normalizePath(path);
  if (EXCLUDED_PREFIXES.some((p) => n.startsWith(p))) return false;
  if (n.startsWith('/api/auth')) return true;
  return MUTATING_METHODS.has(method.toUpperCase());
}

/**
 * Mapea método HTTP a acción (fuera de auth).
 */
export function httpMethodToAuditAction(method: string): AuditAction {
  const upper = method.toUpperCase();
  if (upper === 'POST') return AuditAction.Create;
  if (upper === 'PATCH' || upper === 'PUT') return AuditAction.Update;
  if (upper === 'DELETE') return AuditAction.Delete;
  return AuditAction.Other;
}

/**
 * Resuelve la acción de auditoría según ruta y método.
 */
export function resolveAuditAction(method: string, path: string): AuditAction {
  const n = normalizePath(path);
  if (n.startsWith('/api/auth')) {
    return resolveAuthAuditAction(method, n);
  }
  return httpMethodToAuditAction(method);
}

function resolveAuthAuditAction(method: string, normalizedPath: string): AuditAction {
  const parts = normalizedPath
    .replace(/^\/api\/auth\/?/i, '')
    .split('/')
    .filter(Boolean);
  const m = method.toUpperCase();
  if (parts[0] === 'login' && m === 'POST') return AuditAction.AuthLogin;
  if (parts[0] === 'logout' && m === 'GET') return AuditAction.AuthLogout;
  if (parts[0] === 'create-student' && m === 'POST')
    return AuditAction.AuthRegisterPublic;
  if (parts[0] === 'change-password' && m === 'PUT')
    return AuditAction.AuthChangePassword;
  if (parts[0] === 'recovery-password') {
    if (parts.length === 1 && m === 'POST') return AuditAction.AuthRecoveryRequest;
    if (parts.length >= 2) {
      if (m === 'GET') return AuditAction.AuthRecoveryValidate;
      if (m === 'POST') return AuditAction.AuthRecoveryComplete;
    }
  }
  return AuditAction.AuthOther;
}

/**
 * Oculta token en URL de recuperación al persistir.
 */
export function maskSensitivePath(path: string): string {
  const max = 512;
  const p = path.slice(0, max);
  return p.replace(
    /(\/api\/auth\/recovery-password\/)[^/?#]+/i,
    '$1[REDACTED]',
  );
}

/**
 * Recurso e id para rutas estándar (no auth).
 */
export function parseResourceFromPath(path: string): {
  resource: string;
  resourceId: string | null;
} {
  const withoutApi = path.replace(/^\/api\/?/i, '');
  const parts = withoutApi.split('/').filter(Boolean);
  const resource = parts[0] || 'unknown';
  let resourceId: string | null = null;
  for (let i = 1; i < parts.length; i++) {
    if (/^\d+$/.test(parts[i])) {
      resourceId = parts[i];
      break;
    }
  }
  return { resource, resourceId };
}

/**
 * Recurso fijo auth + subruta (sin token).
 */
export function parseAuthResource(path: string): {
  resource: string;
  resourceId: string | null;
} {
  const n = normalizePath(path).replace(/^\/api\/auth\/?/i, '');
  const parts = n.split('/').filter(Boolean);
  if (parts.length === 0) return { resource: 'auth', resourceId: null };
  if (parts[0] === 'recovery-password' && parts.length >= 2) {
    return { resource: 'auth', resourceId: 'recovery-password' };
  }
  return { resource: 'auth', resourceId: parts[0] ?? null };
}
