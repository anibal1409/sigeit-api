// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Section } from '../../section/entities';
import { User } from '../../user/entities';
import { StageInscription } from '../enums';

@Entity()
export class Inscription extends IdEntity {

  @Index('inscription_stage_index')
  @Column({ nullable: false, default: StageInscription.Validated })
  stage!: string;

  @ManyToOne(() => Section, (section) => section.id)
  @JoinColumn()
  section!: Section;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user!: User;

}
