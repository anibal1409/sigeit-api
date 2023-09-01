import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { School } from '../../school/entities';

@Entity()
export class Department extends IdEntity {

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ nullable: false, unique: true })
  abbreviation: string;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn()
  school!: School;
}
