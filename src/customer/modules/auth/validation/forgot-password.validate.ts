import { object, string } from 'yup';

import { EmailToForgotPasswordDto } from '../dtos/email-forgot-password.dto';

import yupWrapper from '@shared/utils/yup-wrapper';

export const forgotPasswordValidate = yupWrapper<EmailToForgotPasswordDto>(object().shape({
  email: string().trim().email().required(),
  password: string().trim().required(),
  confirmPassword: string().trim().required(),
}));
