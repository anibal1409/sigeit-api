import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { IdEntity } from '../../base';
import { TeacherDegreePeriodDto } from '../dto/create-teacher-degree.dto';
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

  /** Nota mínima aprobatoria; nula si el documento no la indica (se asume la mitad de la escala). */
  @Column('float', { nullable: true })
  minPassingGrade?: number;

  /** Promedio general de la carrera según el documento. */
  @Column('float', { nullable: true })
  average?: number;

  @Column('float', { nullable: true })
  approvedCredits?: number;

  /** Puesto en la promoción de egresados, de `classSize`, con promedio `classAverage`. */
  @Column({ nullable: true })
  classRank?: number;

  @Column({ nullable: true })
  classSize?: number;

  @Column('float', { nullable: true })
  classAverage?: number;

  /** El documento solo incluye notas aprobatorias: faltan retiros y reprobadas. */
  @Column({ default: false })
  onlyPassingGrades!: boolean;

  /** Períodos cursados con el resumen del documento (fechas, promedio, créditos). */
  @Column('jsonb', { nullable: true })
  periods?: TeacherDegreePeriodDto[];

  @ManyToOne(() => Teacher, (teacher) => teacher.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  teacher!: Teacher;

  @OneToMany(() => TeacherGrade, (grade) => grade.degree, { cascade: true })
  grades!: TeacherGrade[];
}
