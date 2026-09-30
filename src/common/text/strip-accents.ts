/** Quita tildes y diéresis ("Lingüística" → "Linguistica"); conserva la ñ como n. */
export function stripAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
