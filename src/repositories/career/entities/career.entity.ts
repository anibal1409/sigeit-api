import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class Career extends IdEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ length: 256, nullable: false })
  description!: string;
}
