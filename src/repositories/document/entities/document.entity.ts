import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department/entities';
import { TypeDocument } from '../enum';

/** Formato de documento de un departamento. Solo uno activo por departamento y tipo. */
@Entity()
export class DocumentE extends IdEntity {
  @Column({ nullable: false })
  name!: string;

  /** Cuerpo con variables (`{tabla}`, etc.). */
  @Column('text')
  body!: string;

  /** Firma con variables. */
  @Column('text')
  signature!: string;

  @Column({ type: 'enum', enum: TypeDocument })
  type!: TypeDocument;

  @ManyToOne(() => Department, (department) => department.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  department: Department;
}
