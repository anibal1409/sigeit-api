import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Departament } from '../../departament/entities';
import { SubjectCarrer } from './subject-career.entity';

@Entity()
export class Subject extends IdEntity {

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  credits: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false })
  hours: number;

  @Column({ nullable: false })
  semester: number;

  @Column({ nullable: false })
  type_curriculum: number;

  @ManyToOne(() => Departament, (departament) => departament.id)
  @JoinColumn()
  departament!: Departament;

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
  carrers: SubjectCarrer[];

}
