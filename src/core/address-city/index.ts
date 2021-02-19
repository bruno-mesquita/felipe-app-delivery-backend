/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import State from '@core/address-state';

@Entity('cities')
class City extends EntityBase {
  @Column()
  name: string;

  @Column({ default: false })
  active: Boolean;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_id' })
  state: State;
}

export default City;
