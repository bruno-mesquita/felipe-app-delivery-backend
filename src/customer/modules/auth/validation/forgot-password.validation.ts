import { object, SchemaOf, string } from 'yup';

import { EmailToForgotPasswordDto } from '../dtos/email-forgot-password.dto';

const REQUIRED = 'Campo obrigatório';

const schema: SchemaOf<EmailToForgotPasswordDto> = object().shape({
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
});

export { schema };
