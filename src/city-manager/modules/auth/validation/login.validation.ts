import { object, string, SchemaOf } from 'yup';

import { LoginDto } from '../dtos/login.dto';

const schema: SchemaOf<LoginDto> = object().shape({
  email: string().trim().email().required(),
  password: string().trim().required(),
});

export default schema;
