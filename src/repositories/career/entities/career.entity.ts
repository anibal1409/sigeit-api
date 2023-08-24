import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../departament/entities';

@Entity()
export class Career extends IdEntity {

  @Column({ nullable: false, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: false, unique: true })
  abbreviation!: string;

  @ManyToOne(() => Department, (departament) => departament.id)
  @JoinColumn()
  department?: Department;
}
