import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateReportDto {
  @ApiProperty({
    description: 'ID del período académico',
    example: 1,
  })
  @IsNumber()
  periodId: number;

  @ApiProperty({
    description: 'ID del departamento',
    example: 1,
  })
  @IsNumber()
  departmentId: number;

  @ApiProperty({
    description: 'Campo por el cual agrupar (semester o teacherName)',
    example: 'semester',
    required: false,
  })
  @IsOptional()
  @IsString()
  groupBy?: 'semester' | 'teacherName';

  @ApiProperty({
    description: 'ID del semestre específico',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  semester?: number;

  @ApiProperty({
    description: 'ID del profesor específico',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  teacherId?: number;

  @ApiProperty({
    description: 'Estado de las secciones',
    example: true,
    required: false,
  })
  @IsOptional()
  status?: boolean;
}
