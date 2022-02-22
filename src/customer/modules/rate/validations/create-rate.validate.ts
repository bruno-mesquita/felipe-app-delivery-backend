import { number, object, string } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';

import { ICreateRateDto } from '../dtos';

export const createRateValidate = yupWrapper<ICreateRateDto>(
  object({
    message: string(),
    value: number(),
    clientId: number().positive().integer().required(),
    orderId: number().positive().integer().required(),
  })
);
