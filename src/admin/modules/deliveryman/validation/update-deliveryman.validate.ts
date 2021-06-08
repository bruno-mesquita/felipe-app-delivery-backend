import { SchemaOf, string, object, number } from 'yup';

import { UpdateDeliverymanDto } from '../dtos';

export const updateDeliverymanValidate: SchemaOf<UpdateDeliverymanDto> = object({
  id: number().positive().integer().required(),
  cellphone: string().required(),
  name: string().required(),
  entry_date: string().required(),
  departure_date: string().required(),
});
