import { ValidationPipe } from '@nestjs/common';

/**
 * Validación estricta para cuerpos y queries: rechaza (400) propiedades sin
 * decoradores, para evitar asignación masiva (p. ej. enviar `id` o `deleted`
 * en un PATCH). El pipe global no lo hace porque DTOs antiguos dependen de
 * propiedades heredadas sin validar.
 */
export const strictValidation = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});
