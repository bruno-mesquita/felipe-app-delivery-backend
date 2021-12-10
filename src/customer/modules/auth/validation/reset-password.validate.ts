import { object, string } from 'yup';

import { IResetPasswordDto } from '../dtos/reset-password.dto';

import yupWrapper from '@shared/utils/yup-wrapper';

export const resetPasswordValidate = yupWrapper<IResetPasswordDto>(object().shape({
  cellphone: string().trim().required(),
  code: string().trim().required(),
  newPassword: string().trim().required(),
  confirmPassword: string().trim().required(),
}));
