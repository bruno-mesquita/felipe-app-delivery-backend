import { object, string, SchemaOf } from 'yup';

import { TakeEmailToForgotPassword } from '../dtos/take-email-forgot-password.dto';

const schema: SchemaOf<TakeEmailToForgotPassword> = object().shape({
  email: string().email().required(),
  code: string().required(),
});

export { schema };
