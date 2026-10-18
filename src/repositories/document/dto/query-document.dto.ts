import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TypeDocument } from '../enum';

/** Filtros opcionales del listado de formatos. */
export class FindDocumentsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  departmentId?: number;

  @ApiPropertyOptional({ enum: TypeDocument, enumName: 'TypeDocument' })
  @IsOptional()
  @IsEnum(TypeDocument)
  type?: TypeDocument;
}

/** Departamento y tipo del formato activo buscado. */
export class ActiveDocumentQueryDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  departmentId!: number;

  @ApiProperty({ enum: TypeDocument, enumName: 'TypeDocument' })
  @IsEnum(TypeDocument)
  type!: TypeDocument;
}
