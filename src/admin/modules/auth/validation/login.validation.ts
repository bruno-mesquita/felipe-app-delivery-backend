import { object, string, SchemaOf } from 'yup';

import { LoginClientDto } from '../dtos/login-client.dto';

const schema: SchemaOf<LoginClientDto> = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export default schema;
