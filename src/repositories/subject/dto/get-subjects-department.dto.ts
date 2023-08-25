import { Type } from 'class-transformer';

export class GetSubjectDepartmentDto {
  @Type(() => Number)
  semester?: number;
}
