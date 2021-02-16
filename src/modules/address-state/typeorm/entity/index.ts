/**

 * @fileoverview Criação da entidade State

 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import City from '@modules/address-city/typeorm/entity';

@Entity('state_address')
class State extends EntityBase {
  @Column()
  name: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}

export default State;
