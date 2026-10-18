import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Department } from '../../department/entities';
import { DocumentE } from '../entities';
import { TypeDocument } from '../enum';

/** Formato de documento devuelto por la API. */
export class ResponseDocumentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  signature: string;

  @ApiProperty({ enum: TypeDocument, enumName: 'TypeDocument' })
  type: TypeDocument;

  @ApiProperty()
  departmentId: number;

  @ApiPropertyOptional({ type: Department })
  department?: Department;

  @ApiProperty()
  status: boolean;

  constructor(data: DocumentE) {
    this.id = data.id;
    this.name = data.name;
    this.body = data.body;
    this.signature = data.signature;
    this.status = data.status;
    this.department = data.department;
    this.departmentId = data.department?.id;
    this.type = data.type;
  }
}
