import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { IdEntity } from '../../base';
import { TeacherDegree } from './teacher-degree.entity';

/**
 * Nota de una asignatura cursada dentro de un título. La asignatura se guarda
 * como texto porque suele pertenecer a otra carrera o institución.
 */
@Entity()
export class TeacherGrade extends IdEntity {
  @Column({ nullable: true })
  code?: string;

  @Column({ nullable: false })
  subjectName!: string;

  /** `subjectName` en minúsculas y sin tildes, para búsquedas. */
  @Index()
  @Column({ nullable: false })
  normalizedName!: string;

  /** Período en que se cursó (p. ej. "2015-1"). */
  @Column({ nullable: true })
  period?: string;

  /** Nota numérica; nula si la asignatura no tiene nota (retirada, aprobada sin nota...). */
  @Column('float', { nullable: true })
  grade?: number;

  /** Resultado no numérico ("RETIRADA", "APROBADO", "EN EJECUCIÓN"). */
  @Column({ nullable: true })
  remark?: string;

  @ManyToOne(() => TeacherDegree, (degree) => degree.grades, {
    onDelete: 'CASCADE',
  })
  degree!: TeacherDegree;
}
