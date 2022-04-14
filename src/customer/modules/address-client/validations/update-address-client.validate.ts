import { object, string, number, boolean } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { IUpdateClientAddressDto } from '../dtos';

export const updateAddressClientValidate = yupWrapper<IUpdateClientAddressDto>(
  object({
    id: number().positive().integer().required(),
    nickname: string().trim(),
    cep: string().trim(),
    street: string().trim(),
    number: string().trim(),
    neighborhood: string().trim(),
    neighborhoodId: number(),
    city: number(),
    userId: number(),
    active: boolean(),
  })
);
