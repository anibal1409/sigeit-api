const SENSITIVE_KEYS = new Set([
  'password',
  'currentpassword',
  'newpassword',
  'oldpassword',
  'token',
  'refreshtoken',
  'authorization',
]);

const MAX_SNIPPET = 4000;

/**
 * Serializa el cuerpo de la petición ocultando campos sensibles y truncando.
 */
export function sanitizeRequestBody(body: unknown): string | null {
  if (body == null || typeof body !== 'object' || Array.isArray(body)) {
    return null;
  }
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      out[key] = '[REDACTED]';
    } else {
      out[key] = value;
    }
  }
  try {
    const s = JSON.stringify(out);
    return s.length > MAX_SNIPPET ? `${s.slice(0, MAX_SNIPPET)}…` : s;
  } catch {
    return null;
  }
}
