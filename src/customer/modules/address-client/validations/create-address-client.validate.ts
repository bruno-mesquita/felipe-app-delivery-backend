import { object, string, number, boolean } from 'yup';

import type { IClientAddressDto } from '../dtos';

import yupWrapper from '@shared/utils/yup-wrapper';

export const createAddressClientValidate = yupWrapper<IClientAddressDto>(object({
  nickname: string().trim().required(),
  cep: string().trim().required(),
  street: string().trim().required(),
  number: string().trim().required(),
  neighborhood: string().trim().required(),
  city: number().required(),
  userId: number().positive().integer().required(),
}));
