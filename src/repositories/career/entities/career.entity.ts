// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department/entities';
import { Subject } from '../../subject';

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

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department?: Department;

  @ManyToMany(() => Subject, (subject) => subject.careers)
  subjects: Subject[];
}
