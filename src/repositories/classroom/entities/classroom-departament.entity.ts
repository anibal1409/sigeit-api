import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Department } from '../../departament';
import { Classroom } from './classroom.entity';

@Entity()
export class ClassroomDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.id)
  @JoinColumn()
  classroom!: Classroom;

  @ManyToOne(() => Department, (departament) => departament.id)
  @JoinColumn()
  departament!: Department;
}
