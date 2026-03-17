/**
 * Obtiene usuario/email para el registro de auditoría en rutas de autenticación.
 */
export function extractAuthAuditUser(req: {
  body?: unknown;
  user?: {
    userId?: string;
    username?: string;
    id?: number;
    email?: string;
  };
  cookies?: { 'sigeit-cookie'?: { id?: number } };
}): { userId: string | null; userEmail: string | null } {
  const u = req.user;
  let userId =
    u?.userId != null
      ? String(u.userId)
      : u?.id != null
        ? String(u.id)
        : null;
  let userEmail = u?.username ?? u?.email ?? null;
  const cookieId = req.cookies?.['sigeit-cookie']?.id;
  if (!userId && cookieId != null) userId = String(cookieId);
  const body = req.body as Record<string, unknown> | undefined;
  if (!userEmail && body && typeof body.email === 'string') {
    userEmail = body.email;
  }
  return { userId, userEmail };
}
