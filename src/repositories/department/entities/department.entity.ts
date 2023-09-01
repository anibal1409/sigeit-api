import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Classroom } from '../../classroom';
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

  @ManyToMany((type) => Classroom, (classroom) => classroom.departments)
  classrooms: Classroom[];
}
