import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department/entities';
import {
  EmploymentStatus,
  HiringEvaluationStatus,
  TeacherCategory,
  TeacherDedication,
} from '../enum';

@Entity()
export class Teacher extends IdEntity {
  @Column({ nullable: false, unique: true })
  idDocument!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @ManyToOne(() => Department, (department) => department.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  department?: Department;

  /** Categoría del escalafón (el nivel I–V se deriva de ella). */
  @Column({ nullable: true })
  category?: TeacherCategory;

  /** Condición laboral: contratado o fijo. */
  @Column({ nullable: true })
  employmentStatus?: EmploymentStatus;

  @Column({ nullable: true })
  dedication?: TeacherDedication;

  /** Estado de la evaluación para contratar; nulo si no aplica. */
  @Column({ nullable: true })
  hiringEvaluationStatus?: HiringEvaluationStatus;

  @Column({ type: 'date', nullable: true })
  hiringEvaluationDate?: string;

  @Column({ type: 'text', nullable: true })
  hiringEvaluationNotes?: string;
}
