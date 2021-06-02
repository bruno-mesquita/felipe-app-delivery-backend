import { object, SchemaOf, string, boolean } from 'yup';

import { CreateOwnerDto } from '../dtos/create-owner-dtos';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<CreateOwnerDto> = object({
  firstName: string().required(REQUIRED),
  lastName: string().required(REQUIRED),
  email: string().email().required(REQUIRED),
  password: string().required(REQUIRED),
  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
  active: boolean().required(REQUIRED),
  cpf: string().required(REQUIRED),
});

export { schema };
