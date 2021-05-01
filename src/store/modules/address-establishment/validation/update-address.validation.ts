import { object, SchemaOf, string, number } from 'yup';

import { UpdateAddressDto } from '../dtos/update-address.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateAddressDto> = object({
  id: number().integer().required(REQUIRED),

  street: string().required(REQUIRED),

  number: string().required(REQUIRED),

  neighborhood: string().required(REQUIRED),

  cep: string().required(REQUIRED),

  city: number().integer().required(REQUIRED)
});

export default schema;
