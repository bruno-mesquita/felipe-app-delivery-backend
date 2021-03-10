/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

*/

import { Entity, Column, OneToOne, JoinColumn, Tree } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import City from '@core/address-city';

@Entity('address')
class Address extends EntityBase {
  @Column({ default: null })
  street: string;

  @Column({ default: null })
  number: number;

  @Column({ default: null })
  neighborhood: string;

  @Column({ default: null })
  cep: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;
}

export default Address;
