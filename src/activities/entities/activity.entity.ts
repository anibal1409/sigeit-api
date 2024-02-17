import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../repositories';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  activityType: string; // Tipo de solicitud (POST, DELETE, PUT, etc.)

  @Column()
  activity: string; // Descripción de la actividad

  @Column({ type: 'text', nullable: true })
  requestBody: string; // Cuerpo de la solicitud

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
