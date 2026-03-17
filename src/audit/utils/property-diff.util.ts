const MAX_JSON = 16000;

/**
 * Serializa un valor para comparación o almacenamiento en el diff.
 */
function serializeForAudit(value: unknown): unknown {
  if (value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  if (value !== null && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if ('id' in o && typeof o.id === 'number') return { id: o.id };
  }
  return value;
}

function normalizeCompare(value: unknown): unknown {
  return JSON.stringify(serializeForAudit(value));
}

/**
 * Construye el mapa de propiedades modificadas (valor anterior vs enviado en el body).
 * Solo compara claves presentes en el body de la petición.
 */
export function buildPropertyChangeMap(
  previous: Record<string, unknown> | null,
  body: unknown,
): Record<string, { previous: unknown; current: unknown }> | null {
  if (
    !previous ||
    body === null ||
    typeof body !== 'object' ||
    Array.isArray(body)
  ) {
    return null;
  }
  const out: Record<string, { previous: unknown; current: unknown }> = {};
  for (const key of Object.keys(body as object)) {
    if (/password|token|secret/i.test(key)) continue;
    const current = (body as Record<string, unknown>)[key];
    if (current === undefined) continue;
    const prev = previous[key];
    if (normalizeCompare(prev) !== normalizeCompare(current)) {
      out[key] = {
        previous: serializeForAudit(prev),
        current: serializeForAudit(current),
      };
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

/**
 * Resumen para operaciones POST (creación): nombres de atributos enviados.
 */
export function buildCreateFieldSummary(
  body: unknown,
): Record<string, unknown> | null {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return null;
  }
  const keys = Object.keys(body as object).filter(
    (k) => !/password|token|secret/i.test(k),
  );
  if (!keys.length) return null;
  return { operation: 'CREATE', fieldsSubmitted: keys };
}

export function stringifyPropertyChanges(
  data: Record<string, unknown> | null,
): string | null {
  if (!data) return null;
  try {
    const s = JSON.stringify(data);
    return s.length > MAX_JSON ? `${s.slice(0, MAX_JSON)}…` : s;
  } catch {
    return null;
  }
}
