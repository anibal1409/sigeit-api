import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AuditAction } from '../enum';

const HTTP_METHODS = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] as const;

/**
 * Filtros compartidos entre listado y estadísticas de auditoría.
 */
export class AuditLogFiltersDto {
  @ApiPropertyOptional({ description: 'Id del usuario actor' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  userId?: string;

  @ApiPropertyOptional({
    description: 'Correo del actor (coincidencia parcial, sin distinguir mayúsculas)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  userEmail?: string;

  @ApiPropertyOptional({ enum: AuditAction, enumName: 'AuditAction' })
  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;

  @ApiPropertyOptional({
    description: 'Varias acciones separadas por coma (ej. CREATE,UPDATE)',
    example: 'CREATE,UPDATE',
  })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  actions?: string;

  @ApiPropertyOptional({
    description: 'Segmento de API / recurso (ej. subject, period)',
    example: 'subject',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  @Matches(/^[a-z][a-z0-9-]*$/i, {
    message: 'resource must be alphanumeric with hyphens',
  })
  resource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  resourceId?: string;

  @ApiPropertyOptional({ description: 'true = solo éxitos HTTP 2xx/3xx' })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  success?: boolean;

  @ApiPropertyOptional({ enum: HTTP_METHODS })
  @IsOptional()
  @IsIn([...HTTP_METHODS])
  httpMethod?: (typeof HTTP_METHODS)[number];

  @ApiPropertyOptional({
    description: 'Inicio del rango (ISO 8601, inclusive)',
    example: '2026-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'Fin del rango (ISO 8601, inclusive)',
    example: '2026-12-31T23:59:59.999Z',
  })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({
    description:
      'Texto libre en ruta, correo, IP, cliente o id de recurso (coincidencia parcial)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  search?: string;

  @ApiPropertyOptional({
    description: 'Si true, solo eventos de autenticación (AUTH_*)',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  authOnly?: boolean;
}
