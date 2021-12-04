import { object, string, SchemaOf } from 'yup';

import { LoginClientDto } from '../dtos/login-client.dto';

const schema: SchemaOf<LoginClientDto> = object().shape({
  email: string().trim().email().required(),
  password: string().trim().required(),
});

export default schema;
