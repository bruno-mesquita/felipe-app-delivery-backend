import { object, SchemaOf, string, number } from 'yup';
import { ClientAddressDto } from '../dtos/create-address-client';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<ClientAddressDto> = object({
  nickname: string().required(REQUIRED),
  cep: string().required(REQUIRED),
  street: string().required(REQUIRED),
  number: string().required(REQUIRED),
  neighborhood: string().required(REQUIRED),
  city: number().required(REQUIRED),
  userId: number().required(REQUIRED),
});

export { schema };
