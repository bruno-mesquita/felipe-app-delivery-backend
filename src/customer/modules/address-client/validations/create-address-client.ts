import { object, SchemaOf, string, number } from 'yup';
import { ClientAddressDto } from '../dtos/create-address-client';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<ClientAddressDto> = object({
  nickname: string().required(),
  cep: string().required(),
  street: string().required(),
  number: string().required(),
  neighborhood: string().required(),
  city: number().required(),
  userId: number().required(),
});

export { schema };
