import { ApiProperty } from '@nestjs/swagger';

import { AuditAction } from '../enum';

/** Conteo por tipo de acción. */
export class AuditStatsActionItemDto {
  @ApiProperty({ enum: AuditAction, enumName: 'AuditAction' })
  action!: AuditAction;

  @ApiProperty()
  count!: number;
}

/** Conteo por recurso (módulo). */
export class AuditStatsResourceItemDto {
  @ApiProperty({ example: 'subject' })
  resource!: string;

  @ApiProperty()
  count!: number;
}

/** Serie diaria de eventos (UTC, fecha YYYY-MM-DD). */
export class AuditStatsByDayItemDto {
  @ApiProperty({ example: '2026-03-01' })
  date!: string;

  @ApiProperty()
  count!: number;
}

/** Agregados de auditoría para KPIs y gráficos. */
export class AuditStatsDto {
  @ApiProperty({ description: 'Eventos que coinciden con los filtros' })
  totalEvents!: number;

  @ApiProperty()
  successCount!: number;

  @ApiProperty()
  failureCount!: number;

  @ApiProperty({
    description: 'Usuarios distintos (userId o userEmail cuando no hay id)',
  })
  distinctActors!: number;

  @ApiProperty({ type: [AuditStatsActionItemDto] })
  byAction!: AuditStatsActionItemDto[];

  @ApiProperty({ type: [AuditStatsResourceItemDto] })
  byResource!: AuditStatsResourceItemDto[];

  @ApiProperty({ type: [AuditStatsByDayItemDto] })
  byDay!: AuditStatsByDayItemDto[];
}
