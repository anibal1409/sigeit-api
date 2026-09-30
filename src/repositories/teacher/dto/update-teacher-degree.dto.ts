import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateTeacherDegreeDto } from './create-teacher-degree.dto';

/** Si se envía `grades`, reemplaza todas las notas del título. */
export class UpdateTeacherDegreeDto extends PartialType(
  OmitType(CreateTeacherDegreeDto, ['teacher']),
) {}
