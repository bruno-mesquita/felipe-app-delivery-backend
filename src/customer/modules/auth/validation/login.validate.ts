import { object, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { LoginClientDto } from '../dtos/login-client.dto';

export const loginValidate = yupWrapper<LoginClientDto>(
  object().shape({
    email: string().trim().email().required(),
    password: string().trim().required(),
  })
);
