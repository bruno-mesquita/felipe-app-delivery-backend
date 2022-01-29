import { string, boolean, array, object } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { UpdateCityDto } from '../dtos/update-city-dto';

export const updateValidate = yupWrapper<UpdateCityDto>(object().shape({
  _id: string().required(),
  name: string().required(),
  state: string().required(),
  active: boolean().required(),
  neighborhoods: array().of(string()).required(),
}));
