import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department/entities';

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

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department?: Department;
}
