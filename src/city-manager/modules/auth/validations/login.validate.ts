import { object, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { ILoginDto } from '../dtos';

export const loginValidate = yupWrapper<ILoginDto>(
  object().shape({
    email: string().trim().email().required(),
    password: string().trim().required(),
  })
);
