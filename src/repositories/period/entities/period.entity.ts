import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class Period extends IdEntity {

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: false })
  start: Date;

  @Column({ nullable: false })
  end: Date;

  @Column({ nullable: false })
  start_time: string;

  @Column({ nullable: false })
  end_time: string;

  @Column({ nullable: false })
  interval: number;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false })
  stage: string;

}
