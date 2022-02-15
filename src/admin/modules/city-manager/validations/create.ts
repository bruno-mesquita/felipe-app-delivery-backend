import { object, string, boolean } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { CityManagerDto } from '../dtos/city-manager-dtos';

export const createValidate = yupWrapper<CityManagerDto>(
  object({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
    cellphone: string().required(),
    active: boolean().required(),
    city: string().required(),
    avatar: string().nullable(),
  })
);
