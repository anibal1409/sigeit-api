import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Period } from '../../period';
import { Subject } from '../../subject';
import { Teacher } from '../../teacher';

@Entity()
export class Section extends IdEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  capacity: number;

  @Column({ default: 0 })
  inscribed: number;

  @ManyToOne(() => Subject, (subject) => subject.id)
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => Period, (period) => period.id)
  @JoinColumn()
  period: Period;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn()
  teacher: Teacher;

  @Column({ default: false, nullable: true })
  all: boolean;
}
