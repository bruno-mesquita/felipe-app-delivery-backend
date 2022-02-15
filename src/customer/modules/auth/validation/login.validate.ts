import { object, string } from 'yup';

import type { LoginClientDto } from '../dtos/login-client.dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const loginValidate = yupWrapper<LoginClientDto>(object().shape({
  email: string().trim().email().required(),
  password: string().trim().required(),
}));
