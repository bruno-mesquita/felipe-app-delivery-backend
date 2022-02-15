import { object, string, SchemaOf } from 'yup';

import { LoginEstablishmentDto } from '../dtos/login-establishment';

const schema: SchemaOf<LoginEstablishmentDto> = object().shape({
  email: string().trim().email().required(),
  password: string().trim().required(),
});

export default schema;
