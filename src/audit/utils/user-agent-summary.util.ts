/**
 * Genera un resumen legible del navegador y SO a partir del header User-Agent.
 * No sustituye librerías especializadas; sirve para vistas rápidas en auditoría.
 */
export function summarizeUserAgent(ua: string | undefined): string | null {
  if (!ua || typeof ua !== 'string') return null;
  let browser = 'Desconocido';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  let os = 'Desconocido';
  if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/Mac OS X|Macintosh/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
  return `${browser} · ${os}`;
}

/** Longitud máxima del User-Agent almacenado (evita filas enormes). */
export const USER_AGENT_MAX = 1024;

export function truncateUserAgent(ua: string | undefined): string | null {
  if (!ua || typeof ua !== 'string') return null;
  const t = ua.trim();
  return t.length > USER_AGENT_MAX ? `${t.slice(0, USER_AGENT_MAX)}…` : t;
}
