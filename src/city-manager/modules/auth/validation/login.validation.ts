import { object, string, SchemaOf } from 'yup';

import { LoginDto } from '../dtos/login.dto';

const schema: SchemaOf<LoginDto> = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export default schema;
