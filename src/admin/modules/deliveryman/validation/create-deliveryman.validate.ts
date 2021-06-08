import { SchemaOf, string, object } from 'yup';

import { CreateDeliverymanDto } from '../dtos';

export const createDeliverymanValidate: SchemaOf<CreateDeliverymanDto> = object({
  cellphone: string().required(),
  name: string().required(),
  entry_date: string().required(),
  departure_date: string().required(),
});
