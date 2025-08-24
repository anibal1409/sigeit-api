import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { IdEntity } from '../../base';
import { Period } from '../../period/entities';
import { Subject } from '../../subject/entities';
import { Teacher } from '../../teacher/entities';

@Entity()
export class Section extends IdEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  capacity: number;

  @Column({ default: 0 })
  inscribed: number;

  @ManyToOne(() => Subject, (subject) => subject.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => Period, (period) => period.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  period: Period;

  @ManyToOne(() => Teacher, (teacher) => teacher.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  teacher: Teacher;

  @Column({ default: false, nullable: true })
  all: boolean;
}
