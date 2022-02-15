import { object, string } from 'yup';

import type { IForgotPasswordDto } from '../dtos/forgot-password.dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const forgotPasswordValidate = yupWrapper<IForgotPasswordDto>(object().shape({
  cellphone: string().trim().required(),
}));
