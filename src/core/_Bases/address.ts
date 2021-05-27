import City from '@core/city';

import Model from './model';

abstract class Address extends Model {
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  city_id: number;

  public readonly city: City;

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

  public getCityId(): number {
    return this.city_id
  }

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

  public setCityId(city_id: number): void {
    this.city_id = city_id
  }
}

export default Address;

