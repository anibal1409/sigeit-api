import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Career } from '../../career/entities';
import { Department } from '../../department/entities';
import { Subject } from '../entities';
import { SubjectInstructionType } from '../enum';
import { resolveSubjectInstructionType } from '../subject-hours';

export class ResponseSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  credits!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Horas semanales totales' })
  @IsNotEmpty()
  @Type(() => Number)
  hours!: number;

  @ApiProperty({ description: 'Horas semanales teóricas' })
  @IsNotEmpty()
  @Type(() => Number)
  theoreticalHours!: number;

  @ApiProperty({ description: 'Horas semanales prácticas' })
  @IsNotEmpty()
  @Type(() => Number)
  practicalHours!: number;

  @ApiProperty({
    enum: SubjectInstructionType,
    enumName: 'SubjectInstructionType',
    description: 'Derivado del reparto teoría/práctica',
  })
  instructionType!: SubjectInstructionType;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  semester!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  typeCurriculum!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  departmentId: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Department)
  department: Department;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @Type(() => Number)
  careerIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Career)
  careers: Career[];

  constructor(data: Subject) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.departmentId = data.department.id;
    this.department = data.department;
    this.status = data.status;
    this.careerIds = data.careers.map((item) => item.id);
    this.code = data.code;
    this.credits = data.credits;
    this.hours = data.hours;
    this.theoreticalHours = data.theoreticalHours;
    this.practicalHours = data.practicalHours;
    this.instructionType = resolveSubjectInstructionType(
      data.theoreticalHours,
      data.practicalHours,
    );
    this.semester = data.semester;
    this.typeCurriculum = data.typeCurriculum;
    this.careers = data.careers;
  }
}
