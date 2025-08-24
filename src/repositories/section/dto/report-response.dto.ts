import { ApiProperty } from '@nestjs/swagger';

export class ReportResponseDto {
  @ApiProperty({
    description: 'Buffer del archivo Excel generado',
    example: 'base64-encoded-excel-file',
    type: 'string',
    format: 'binary',
  })
  buffer: any;

  @ApiProperty({
    description: 'Nombre del archivo generado',
    example: 'reporte_secciones_2024-08-24.xlsx',
  })
  filename: string;

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  contentType: string;

  @ApiProperty({
    description: 'Tamaño del archivo en bytes',
    example: 1024,
  })
  contentLength: number;

  @ApiProperty({
    description: 'Fecha y hora de generación del reporte',
    example: '2024-08-24T18:30:00.000Z',
  })
  generatedAt: Date;

  @ApiProperty({
    description: 'Mensaje de confirmación',
    example: 'Reporte generado exitosamente',
  })
  message: string;
}
