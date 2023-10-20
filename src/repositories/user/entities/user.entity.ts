import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ApiHideProperty } from '@nestjs/swagger';

import { IdEntity } from '../../base';
import { Career } from '../../career/entities';
import { Department } from '../../department';
import { School } from '../../school';
import { Teacher } from '../../teacher';
import { Roles } from '../enums';

@Entity()
export class User extends IdEntity {

  @Column({ length: 256, nullable: false })
  name!: string;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false, unique: true })
  idDocument!: string;

  @Index('user_role_index')
  @Column({ nullable: false, default: Roles.Teacher })
  role!: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 256, nullable: false })
  password!: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn()
  teacher?: Teacher;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn()
  school?: School;

  @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department?: Department;

  @ManyToOne(() => Career, (career) => career.id)
  @JoinColumn()
  career?: Career;

}
