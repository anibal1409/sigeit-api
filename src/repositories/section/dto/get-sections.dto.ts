import { Type } from 'class-transformer';

export class GetSectionsDto {
  @Type(() => Number)
  subjectId?: number;

  @Type(() => Number)
  periodId?: number;

  @Type(() => Number)
  teacherId?: number;

  @Type(() => Number)
  semester?: number;
}
