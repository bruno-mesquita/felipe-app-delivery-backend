import { object, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { IRefreshTokenDto } from '../dtos';

export const refreshTokenValidate = yupWrapper<IRefreshTokenDto>(
  object().shape({
    token: string().trim().required(),
  })
);
