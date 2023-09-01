// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Classroom } from '../../classroom/entities';
import { Day } from '../../day/entities';
import { Period } from '../../period/entities';
import { Section } from '../../section/entities';

@Entity()
export class Schedule extends IdEntity {

  @Column({ nullable: false })
  start: string;

  @Column({ nullable: true })
  end: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.id)
  @JoinColumn()
  classroom: Classroom;

  @ManyToOne(() => Day, (day) => day.id)
  @JoinColumn()
  day: Day;

  @ManyToOne(() => Section, (section) => section.id)
  @JoinColumn()
  section: Section;

  @ManyToOne(() => Period, (period) => period.id)
  @JoinColumn()
  period: Period;
}
