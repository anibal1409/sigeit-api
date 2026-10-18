import { Column, Entity } from 'typeorm';

import { IdEntity } from '../../base';

/** Configuración única del instituto y horario por defecto de los períodos. Horas en HH:mm, como Period. */
@Entity()
export class Setting extends IdEntity {
  @Column({ length: 100 })
  instituteName: string;

  @Column({ length: 20 })
  instituteAbbreviation: string;

  @Column({ length: 500, nullable: true })
  description?: string;

  @Column({ length: 5 })
  startTime: string;

  @Column({ length: 5 })
  endTime: string;

  @Column()
  /** Duración de cada bloque en minutos. */
  duration: number;

  @Column()
  /** Descanso entre bloques en minutos. */
  interval: number;
}
