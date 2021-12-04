import { object, SchemaOf, string } from 'yup';

import { EmailToForgotPasswordDto } from '../dtos/email-forgot-password.dto';

const schema: SchemaOf<EmailToForgotPasswordDto> = object().shape({
  email: string().trim().email().required(),
  password: string().trim().required(),
  confirmPassword: string().trim().required(),
});

export { schema };
