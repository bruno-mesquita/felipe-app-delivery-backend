import { object, SchemaOf, string, number } from 'yup';
import { ClientAddressDto } from '../dtos/create-address-client';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<ClientAddressDto> = object({
  nickname: string().required(REQUIRED),
  cep: string().required(REQUIRED),
  street: string().required(REQUIRED),
  number: number().required(REQUIRED),
  neighborhood: string().required(REQUIRED),
  city: string().uuid().required(REQUIRED),
  userId: string().uuid().required(REQUIRED),
});

export { schema };
