import { object, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { ICreateAvatarDto } from '../dtos';

export const createAvatarValidate = yupWrapper<ICreateAvatarDto>(
  object({
    name: string().trim(),
    encoded: string().trim().required(),
    clientId: number().positive().integer().required(),
  })
);
