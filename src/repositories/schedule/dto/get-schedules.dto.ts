import { Type } from 'class-transformer';

export class GetSchedulesDto {
  @Type(() => Number)
  sectionId?: number;

  @Type(() => Number)
  subjectId?: number;

  @Type(() => Number)
  periodId?: number;

  @Type(() => Number)
  teacherId?: number;

  @Type(() => Number)
  semester?: number;
  
  @Type(() => Number)
  dayId?: number;

  @Type(() => Number)
  classroomId?: number;
}
