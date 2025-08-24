import { Column, Entity } from 'typeorm';

import { IdEntity } from '../../base';
import { StagePeriod } from '../enum';

@Entity()
export class Period extends IdEntity {
  @Column({ nullable: false, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  start!: Date;

  @Column({ nullable: false })
  end!: Date;

  @Column({ nullable: false })
  startTime!: string;

  @Column({ nullable: false })
  endTime!: string;

  @Column({ nullable: false })
  interval!: number;

  @Column({ nullable: false })
  duration!: number;

  @Column({ nullable: false })
  stage!: StagePeriod;
}
