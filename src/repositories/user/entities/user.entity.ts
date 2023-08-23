import { Entity } from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class User extends IdEntity {}
