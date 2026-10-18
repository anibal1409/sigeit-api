import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department/entities';

/** Correlativo de oficios de un departamento (una fila por departamento). */
@Entity()
export class DepartmentSetting extends IdEntity {
  @OneToOne(() => Department, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /** FK explícita para filtrar y bloquear la fila sin JOIN. */
  @Column({ unique: true })
  departmentId: number;

  /** Prefijo del código, p. ej. DIS. */
  @Column({ length: 10 })
  officePrefix: string;

  /** Año del último número emitido. */
  @Column()
  officeYear: number;

  @Column({ default: 0 })
  officeLastNumber: number;

  /** Si la generación masiva pide el número inicial. */
  @Column({ default: true })
  askOfficeNumberOnBulk: boolean;
}
