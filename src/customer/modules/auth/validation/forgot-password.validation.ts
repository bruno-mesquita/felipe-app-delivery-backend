import { object, SchemaOf, string } from 'yup';

import { EmailToForgotPasswordDto } from '../dtos/email-forgot-password.dto';

const REQUIRED = 'Campo obrigatório';

const schema: SchemaOf<EmailToForgotPasswordDto> = object().shape({
  email: string().email('Email inválido').required(REQUIRED),
  password: string().required(REQUIRED),
  confirmPassword: string().required(REQUIRED),
});

export { schema };
