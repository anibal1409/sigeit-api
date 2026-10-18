import {
  IsBoolean,
  IsInt,
  IsOptional,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DepartmentSetting } from '../entities';

/** Correlativo de oficios de un departamento. `officeLastNumber` es 0 si `officeYear` no es el año en curso. */
export class ResponseDepartmentSettingDto {
  @ApiProperty()
  departmentId: number;

  @ApiProperty()
  departmentName: string;

  @ApiProperty({ example: 'DIS' })
  officePrefix: string;

  @ApiProperty()
  officeYear: number;

  @ApiProperty()
  officeLastNumber: number;

  @ApiProperty()
  askOfficeNumberOnBulk: boolean;

  constructor(data: DepartmentSetting, currentYear: number) {
    const isCurrent = data.officeYear === currentYear;
    this.departmentId = data.departmentId;
    this.departmentName = data.department?.name;
    this.officePrefix = data.officePrefix;
    this.officeYear = currentYear;
    this.officeLastNumber = isCurrent ? data.officeLastNumber : 0;
    this.askOfficeNumberOnBulk = data.askOfficeNumberOnBulk;
  }
}

/** Campos editables del correlativo; todos opcionales. */
export class UpdateDepartmentSettingDto {
  @ApiPropertyOptional({ example: 'DIS' })
  @IsOptional()
  @Matches(/^[A-Z0-9]{1,10}$/)
  officePrefix?: string;

  @ApiPropertyOptional({
    description: 'Último número emitido en el año en curso',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  officeLastNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  askOfficeNumberOnBulk?: boolean;
}

/** Pedido de reserva de números de oficio. */
export class ReserveOfficeNumbersDto {
  @ApiProperty({ minimum: 1, maximum: 500 })
  @IsInt()
  @Min(1)
  @Max(500)
  count: number;

  @ApiProperty({ example: 2026 })
  @IsInt()
  @Min(2000)
  @Max(9999)
  year: number;

  @ApiPropertyOptional({ description: 'Número inicial escrito por el usuario' })
  @IsOptional()
  @IsInt()
  @Min(1)
  start?: number;
}

/** Números reservados y sus códigos ya formateados (p. ej. DIS-249/2026). */
export class ResponseOfficeNumbersDto {
  @ApiProperty()
  prefix: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ type: Number, isArray: true })
  numbers: number[];

  @ApiProperty({ type: String, isArray: true, example: ['DIS-249/2026'] })
  codes: string[];
}
