import { object, SchemaOf, string, boolean, number } from 'yup';

import { CreateOwnerDto } from '../dtos/create-owner-dtos';

const schema: SchemaOf<CreateOwnerDto> = object({
  firstName: string().trim().required(),
  lastName: string().trim().required(),
  email: string().trim().email().required(),
  password: string().trim().required(),
  cellphone: string().trim().required(),
  active: boolean().required(),
  cpf: string().trim().required(),
  created_by_id: number().required(),
});

export { schema };
