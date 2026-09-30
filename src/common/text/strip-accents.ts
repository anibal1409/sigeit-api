/** Quita tildes y diéresis ("Lingüística" → "Linguistica"); conserva la ñ como n. */
export function stripAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Minúsculas, sin tildes y con espacios simples, para comparar y buscar nombres. */
export function normalizeText(text: string): string {
  return stripAccents(text).toLowerCase().replace(/\s+/g, ' ').trim();
}
