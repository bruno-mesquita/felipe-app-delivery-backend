/**

 * @fileoverview Criação da entidade State

 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, OneToMany } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import City from '@core/address-city';

@Entity('state_address')
class State extends EntityBase {
  @Column()
  name: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  public getName(): string {
    return this.name;
  }
}

export default State;
