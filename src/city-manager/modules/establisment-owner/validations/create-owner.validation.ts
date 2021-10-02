import { object, SchemaOf, string, boolean, number } from 'yup';

import { CreateOwnerDto } from '../dtos/create-owner-dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateOwnerDto> = object({
  firstName: string().required(REQUIRED),
  lastName: string().required(REQUIRED),
  email: string().email().required(REQUIRED),
  password: string().required(REQUIRED),
  cellphone: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
  cpf: string().required(REQUIRED),
  created_by_id: number().required(REQUIRED),
});

export { schema };
