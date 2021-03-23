/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

*/

import { Entity, Column, OneToOne, JoinColumn, Tree, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  public setStreet(street: string): void {
    this.street = street;
  }

  public setNumber(number: number): void {
    this.number = number;
  }

  public setNeighborhood(neighborhood: string): void {
    this.neighborhood = neighborhood;
  }

  public setCep(cep: string): void {
    this.cep = cep;
  }

  public setCity(city: City): void {
    this.city = city;
  }
}

export default Address;
