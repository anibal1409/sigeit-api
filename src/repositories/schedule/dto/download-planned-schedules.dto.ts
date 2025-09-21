import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class DownloadPlannedSchedulesDto {
  @ApiProperty({ description: 'ID del departamento' })
  @IsNumber()
  departmentId: number;

  @ApiProperty({ description: 'ID del período' })
  @IsNumber()
  periodId: number;

  @ApiProperty({ description: 'Estado de los horarios', required: false })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiProperty({ description: 'Campo por el cual agrupar (semester, teacherName)', required: false })
  @IsOptional()
  groupBy?: string;
}


