import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TeacherDegree, TeacherGrade } from '../entities';
import { DegreeLevel } from '../enum';
import { TeacherGradeDto } from './create-teacher-degree.dto';

/** Nota guardada de un título. */
export class ResponseTeacherGradeDto extends TeacherGradeDto {
  @ApiProperty()
  id!: number;

  constructor(data: TeacherGrade) {
    super();
    this.id = data.id;
    this.code = data.code;
    this.subjectName = data.subjectName;
    this.period = data.period;
    this.grade = data.grade;
    this.remark = data.remark;
  }
}

/** Título de un profesor con sus notas. */
export class ResponseTeacherDegreeDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({ enum: DegreeLevel, enumName: 'DegreeLevel' })
  level!: DegreeLevel;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional()
  institution?: string;

  @ApiPropertyOptional()
  graduationDate?: string;

  @ApiProperty()
  maxGrade!: number;

  @ApiProperty({ type: [ResponseTeacherGradeDto] })
  grades!: ResponseTeacherGradeDto[];

  constructor(data: TeacherDegree) {
    this.id = data.id;
    this.level = data.level;
    this.title = data.title;
    this.institution = data.institution;
    this.graduationDate = data.graduationDate;
    this.maxGrade = data.maxGrade;
    this.grades = (data.grades ?? []).map(
      (grade) => new ResponseTeacherGradeDto(grade),
    );
  }
}
