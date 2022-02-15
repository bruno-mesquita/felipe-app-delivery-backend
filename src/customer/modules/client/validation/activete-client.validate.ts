 import { object, number, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';

import { IActiveClientDto } from '../dtos';

export const activateClientValidate = yupWrapper<IActiveClientDto>(object({
  userId: number().integer().min(1).required(),
  code: string().trim().required(),
}))
