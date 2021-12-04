import { object, SchemaOf, string, number } from 'yup';
import { ClientAddressDto } from '../dtos/create-address-client';

const schema: SchemaOf<ClientAddressDto> = object({
  nickname: string().trim().required(),
  cep: string().trim().required(),
  street: string().trim().required(),
  number: string().trim().required(),
  neighborhood: string().trim().required(),
  city: number().required(),
  userId: number().required(),
});

export { schema };
