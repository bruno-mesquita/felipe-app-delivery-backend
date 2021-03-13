import { object, SchemaOf, string, number } from 'yup';
import { CreateAddressClient } from '../dtos/create-address-client';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateAddressClient> = object({
  nickname: string().required(REQUIRED),

  client_id: string().uuid().required(REQUIRED),

  address_id: string().uuid().required(REQUIRED),
});

export { schema };
