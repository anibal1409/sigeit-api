import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { IdEntity } from '../../base';
import { Period } from '../../period/entities';
import { Subject } from '../../subject/entities';

/**
 * Demanda potencial de una asignatura en un período, desglosada por nivel del
 * estudiante. Proviene del reporte de Control de Estudios (una fila por
 * asignatura y nivel).
 */
@Entity()
@Unique(['period', 'subject', 'level'])
export class SubjectDemand extends IdEntity {
  /**
   * Nivel en el que se ubica el estudiante (no confundir con el semestre de la
   * asignatura en el pensum).
   */
  @Column({ nullable: false })
  level!: number;

  /** Cantidad de estudiantes de ese nivel aptos para cursar la asignatura. */
  @Column({ nullable: false })
  quantity!: number;

  @ManyToOne(() => Period, (period) => period.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  period!: Period;

  @ManyToOne(() => Subject, (subject) => subject.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  subject!: Subject;
}
