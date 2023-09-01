import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Career } from '../../career';
import { Department } from '../../department/entities';

@Entity()
export class Subject extends IdEntity {

  @Column({ nullable: false, unique: true })
  code!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  credits!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  hours!: number;

  @Column({ nullable: false })
  semester!: number;

  @Column({ nullable: false })
  type_curriculum!: number;

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department!: Department;

  @ManyToMany((type) => Career)
  @JoinTable()
  careers: Career[];

}
