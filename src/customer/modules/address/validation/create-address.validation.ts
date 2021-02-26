import { object, SchemaOf, string, number } from 'yup';
import { ClientAddressDto } from '../dtos/create-address-client/create-address-client-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<ClientAddressDto> = object({
  street: string().required(REQUIRED),
  number: number().required(REQUIRED),
  neighborhood: string().required(REQUIRED),
  cep: string().required(REQUIRED),
  city: string().required(REQUIRED),
  state: string().required(REQUIRED),
});

export { schema };
