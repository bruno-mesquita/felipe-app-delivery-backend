/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 */
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import State from '@modules/state/typeorm/entity';
import EntityBase from '@shared/utils/entity';

@Entity('cities')
class City extends EntityBase {
  @Column()
  name: string;

  @OneToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;
}

export default City;
