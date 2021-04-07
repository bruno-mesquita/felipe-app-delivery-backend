import Model from './model';

abstract class Address extends Model {
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  city_id: number;
}

export default Address;
