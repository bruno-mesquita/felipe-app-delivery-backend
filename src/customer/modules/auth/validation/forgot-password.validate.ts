import { object, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { IForgotPasswordDto } from '../dtos/forgot-password.dto';

export const forgotPasswordValidate = yupWrapper<IForgotPasswordDto>(
  object().shape({
    cellphone: string().trim().required(),
  })
);
