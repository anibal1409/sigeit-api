// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Department } from '../../department';
import { TypeDocument } from '../enum';

@Entity()
export class DocumentE extends IdEntity {

  @Column({ nullable: false })
  name!: string;

  @Column('simple-json', { nullable: false })
  description!: string;

  @Column({ nullable: false })
  type!: TypeDocument;

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department?: Department;

}
