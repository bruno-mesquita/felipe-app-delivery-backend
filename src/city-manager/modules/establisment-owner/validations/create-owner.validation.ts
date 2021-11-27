import { object, SchemaOf, string, boolean, number } from 'yup';

import { CreateOwnerDto } from '../dtos/create-owner-dtos';

const schema: SchemaOf<CreateOwnerDto> = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string().required(),
  cellphone: string().required(),
  active: boolean().required(),
  cpf: string().required(),
  created_by_id: number().required(),
});

export { schema };
