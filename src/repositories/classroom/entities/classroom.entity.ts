import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { ClassroomDepartment } from './classroom-departament.entity';

@Entity()
export class Classroom extends IdEntity {

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false })
  type: string;

  @ManyToMany(() => ClassroomDepartment)
  @JoinTable({
    name: 'classroom_departament', // pivot table name
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
  departments: ClassroomDepartment[];
}