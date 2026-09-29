import { ApiProperty } from '@nestjs/swagger';

/** Resumen de la importación del reporte de demanda. */
export class ImportSubjectDemandResultDto {
  @ApiProperty({ description: 'Registros (asignatura + nivel) guardados' })
  imported!: number;

  @ApiProperty({
    type: [String],
    description: 'Códigos del archivo que no existen como asignatura',
  })
  unknownCodes!: string[];

  @ApiProperty({
    type: [Number],
    description: 'Filas del archivo descartadas por datos inválidos',
  })
  invalidRows!: number[];
}
