import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassroomDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  classroomId: number;

  @Column({ nullable: false })
  departamentId: number;
}
