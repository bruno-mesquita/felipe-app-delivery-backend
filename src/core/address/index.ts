/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

*/

import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import City from '@core/address-city';

@Entity('address')
class Address extends EntityBase {
  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  cep: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;
}

export default Address;
