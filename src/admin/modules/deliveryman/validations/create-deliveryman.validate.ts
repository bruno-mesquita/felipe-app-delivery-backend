import { string, object, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { ICreateDeliverymanDto } from '../dtos';

export const createDeliverymanValidate = yupWrapper<ICreateDeliverymanDto>(
  object({
    city_id: number().integer().positive().required(),
    cellphone: string().required(),
    name: string().required(),
    entry_date: string().required(),
    departure_date: string().required(),
  })
);
