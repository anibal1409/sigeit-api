const NUMERIC_CODE_LENGTH = 7;

/**
 * Formato canónico del código de asignatura. Los códigos numéricos se guardan
 * con 7 dígitos y sin separadores ("61822" → "0061822", "071-5963" →
 * "0715963"); los alfanuméricos (p. ej. "ECSA") solo se recortan.
 */
export function normalizeSubjectCode(code: string): string {
  const trimmed = code.trim();
  if (!/^[\d\s.-]+$/.test(trimmed)) {
    return trimmed;
  }
  return trimmed.replace(/\D/g, '').padStart(NUMERIC_CODE_LENGTH, '0');
}
