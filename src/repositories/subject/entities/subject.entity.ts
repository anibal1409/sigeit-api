import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../departament/entities';
import { SubjectCarrer } from './subject-career.entity';

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

  @ManyToMany((type) => SubjectCarrer)
  @JoinTable({
    name: 'subject_career', // pivot table name
      // Custom column name
      // joinColumn: {
      //    name: "userId",
      //    referencedColumnName: "id"
      // },
      // inverseJoinColumn: {
      //    name: "tweetId",
      //    referencedColumnName: "id"
    // }
  })
  subjectCareer!: SubjectCarrer[];

}
