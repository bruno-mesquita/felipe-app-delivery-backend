import { object, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { IClientAddressDto } from '../dtos';

export const createAddressClientValidate = yupWrapper<IClientAddressDto>(
  object({
    nickname: string().trim().required(),
    cep: string().trim().required(),
    street: string().trim().required(),
    number: string().trim().required(),
    neighborhood: string().trim().required(),
    neighborhoodId: number(),
    city: number().required(),
    userId: number().positive().integer().required(),
  })
);
