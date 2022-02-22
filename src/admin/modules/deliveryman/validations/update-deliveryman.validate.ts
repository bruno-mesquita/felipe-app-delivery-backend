import { string, object, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { IUpdateDeliverymanDto } from '../dtos';

export const updateDeliverymanValidate = yupWrapper<IUpdateDeliverymanDto>(
  object({
    id: number().positive().integer().required(),
    cellphone: string().trim().required(),
    name: string().trim().required(),
    entry_date: string().trim().required(),
    departure_date: string().trim().required(),
    city_id: number().positive().integer().required(),
  })
);
