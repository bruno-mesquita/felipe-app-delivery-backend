import { string, boolean, object, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { UpdateCityDto } from '../dtos/update-city-dto';

export const updateValidate = yupWrapper<UpdateCityDto>(object().shape({
  id: number().positive().integer().required(),
  name: string(),
  state: string(),
  active: boolean(),
}));
