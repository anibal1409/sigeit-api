import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AuditAction } from '../enum';

/**
 * DTO de respuesta para un registro de auditoría (propiedades en camelCase).
 */
export class ResponseAuditLogDto {
  @ApiProperty()
  id!: number;

  @ApiPropertyOptional()
  userId!: string | null;

  @ApiPropertyOptional()
  userEmail!: string | null;

  @ApiProperty({ enum: AuditAction })
  action!: AuditAction;

  @ApiProperty()
  resource!: string;

  @ApiPropertyOptional()
  resourceId!: string | null;

  @ApiProperty()
  httpMethod!: string;

  @ApiProperty()
  path!: string;

  @ApiPropertyOptional()
  ipAddress!: string | null;

  @ApiPropertyOptional({
    description: 'User-Agent enviado por el navegador (truncado)',
  })
  userAgent!: string | null;

  @ApiPropertyOptional({
    description: 'Resumen navegador/SO derivado del User-Agent',
  })
  clientSummary!: string | null;

  @ApiPropertyOptional()
  payloadSnippet!: string | null;

  @ApiPropertyOptional({
    description:
      'En updates: mapa campo → { previous, current }. En CREATE: fieldsSubmitted.',
    type: 'object',
    additionalProperties: true,
  })
  propertyChanges!: Record<string, unknown> | null;

  @ApiProperty()
  statusCode!: number;

  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  createdAt!: Date;
}
