import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Career } from '../../career';
import { Subject } from './subject.entity';

@Entity()
export class SubjectCarrer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subject, (subject) => subject.id)
  @JoinColumn()
  subject!: Subject;

  @ManyToOne(() => Career, (career) => career.id)
  @JoinColumn()
  career!: Career;
}
