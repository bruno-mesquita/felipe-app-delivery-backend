/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

*/

import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import City from '@modules/address-city/typeorm/entity';

import EntityBase from '@shared/utils/entity';
import Establishment from '@modules/establishment/typeorm/entity';

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
