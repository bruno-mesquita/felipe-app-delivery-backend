import City from '@core/city';

import Model from './model';

abstract class Address extends Model {
  declare street: string;

  declare number: string;

  declare neighborhood: string;

  declare cep: string;

  declare city_id: number;

  declare city: City;
}

export default Address;
