import Model from './model';

abstract class Address extends Model {
  nickname: string;
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
}

export default Address;

