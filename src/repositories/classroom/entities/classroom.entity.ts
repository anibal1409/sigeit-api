import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department/entities';

@Entity()
export class Classroom extends IdEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false })
  type: string;

  @ManyToMany((type) => Department)
  @JoinTable()
  departments: Department[];
}
