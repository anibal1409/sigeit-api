import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { IdEntity } from '../../base';
import { DegreeLevel } from '../enum';
import { TeacherGrade } from './teacher-grade.entity';
import { Teacher } from './teacher.entity';

/** Título académico obtenido por un profesor, con las notas de sus asignaturas. */
@Entity()
export class TeacherDegree extends IdEntity {
  @Column({ nullable: false })
  level!: DegreeLevel;

  /** Nombre del título o programa (p. ej. "Ingeniería de Sistemas"). */
  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: true })
  institution?: string;

  @Column({ type: 'date', nullable: true })
  graduationDate?: string;

  /** Nota máxima de la escala de la institución (10, 20, 100...). */
  @Column('float', { nullable: false })
  maxGrade!: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  teacher!: Teacher;

  @OneToMany(() => TeacherGrade, (grade) => grade.degree, { cascade: true })
  grades!: TeacherGrade[];
}
