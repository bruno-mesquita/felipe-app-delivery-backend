import { object, SchemaOf, string, number } from 'yup';

import type { UpdateAddressDto } from '../dtos/update-address.dto';

const schema: SchemaOf<UpdateAddressDto> = object({
  id: number().integer().required(),
  street: string().trim().required(),
  number: string().trim().required(),
  neighborhood: string().trim().required(),
  cep: string().trim().required(),
  city: number().integer().required()
});

export default schema;
