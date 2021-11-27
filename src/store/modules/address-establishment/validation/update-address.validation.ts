import { object, SchemaOf, string, number } from 'yup';

import { UpdateAddressDto } from '../dtos/update-address.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateAddressDto> = object({
  id: number().integer().required(),

  street: string().required(),

  number: string().required(),

  neighborhood: string().required(),

  cep: string().required(),

  city: number().integer().required()
});

export default schema;
