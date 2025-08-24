import { Column, Entity } from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class Day extends IdEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  abbreviation: string;
}
