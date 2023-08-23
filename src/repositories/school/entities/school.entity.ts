import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class School extends IdEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ nullable: false, unique: true })
  abbreviation: string;
}
