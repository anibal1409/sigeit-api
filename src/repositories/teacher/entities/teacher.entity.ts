import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Departament } from '../../departament/entities';

@Entity()
export class Teacher extends IdEntity {

  @Column({ nullable: false })
  id_document: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  email!: string;

  @ManyToOne(() => Departament, (departament) => departament.id)
  @JoinColumn()
  departament!: Departament;
}
