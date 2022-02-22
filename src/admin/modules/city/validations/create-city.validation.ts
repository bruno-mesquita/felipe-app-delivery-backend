import { object, string, boolean, array } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { CityAddressDto } from '../dtos/create-city-dto';

export const createValidate = yupWrapper<CityAddressDto>(
  object({
    name: string().required(),
    state: string().required(),
    active: boolean().required(),
    neighborhoods: array().of(string()).required(),
  })
);
