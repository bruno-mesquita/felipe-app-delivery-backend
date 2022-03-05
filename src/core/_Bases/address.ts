import City from '@core/city';

import Model from './model';

abstract class Address extends Model {
  declare street: string;

  declare number: string;

  declare neighborhood: string;

  declare cep: string;

  declare city_id: number;

  declare city: City;

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
