import { object, string, SchemaOf } from 'yup';

import { LoginEstablishmentDto } from '../dtos/login-establishment';

const schema: SchemaOf<LoginEstablishmentDto> = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export default schema;
