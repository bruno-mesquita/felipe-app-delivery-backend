/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

*/

import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import encrypted from '@shared/typeorm/encrypted';
import EntityBase from '@shared/utils/entity';
import City from '@core/address-city';
import Order from '@core/order';

@Entity('address')
class Address extends EntityBase {
  @Column({ default: 'Não informado', transformer: encrypted() })
  street: string;

  @Column({ default: 'Não informado', transformer: encrypted() })
  number: string;

  @Column({ default: 'Não informado', transformer: encrypted() })
  neighborhood: string;

  @Column({ default: 'Não informado', transformer: encrypted() })
  cep: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];

  public setStreet(street: string): void {
    this.street = street;
  }

  public setNumber(number: string): void {
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

  public getStreet(): string {
    return this.street;
  }

  public getNumber(): string {
    return this.number;
  }

  public getNeighborhood(): string {
    return this.neighborhood;
  }

  public getCep(): string {
    return this.cep;
  }

  public getCity(): City {
    return this.city;
  }
}

export default Address;
