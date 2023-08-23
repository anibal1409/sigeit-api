import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubjectCarrer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  subjectId: number;

  @Column({ nullable: false })
  careerId: number;
}
