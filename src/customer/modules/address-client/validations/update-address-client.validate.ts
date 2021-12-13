import { object, string, number, boolean } from 'yup';

import type { IUpdateClientAddressDto } from '../dtos';

import yupWrapper from '@shared/utils/yup-wrapper';

export const updateAddressClientValidate = yupWrapper<IUpdateClientAddressDto>(object({
  id: number().positive().integer().required(),
  nickname: string().trim(),
  cep: string().trim(),
  street: string().trim(),
  number: string().trim(),
  neighborhood: string().trim(),
  city: number(),
  userId: number(),
  active: boolean(),
}));
