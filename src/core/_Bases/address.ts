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
    return this.get('street');
  }

  public getNumber(): string {
    return this.get('number');
  }

  public getNeighborhood(): string {
    return this.get('neighborhood');
  }

  public getCep(): string {
    return this.get('cep');
  }

  public getCityId(): number {
    return this.get('city_id');
  }

  public setStreet(street: string): void {
    this.set('street', street);
  }

  public setNumber(number: string): void {
    this.set('number', number);
  }

  public setNeighborhood(neighborhood: string): void {
    this.set('neighborhood', neighborhood);
  }

  public setCep(cep: string): void {
    this.set('cep', cep);
  }

  public setCityId(city_id: number): void {
    this.set('city_id', city_id);
  }
}

export default Address;

