import { object, SchemaOf, string, number, boolean } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { CreateProductDto } from '../dtos/create-product-dto';

const schema: SchemaOf<CreateProductDto> = object({
  name: string().trim().required(),
  price: number().positive().required(),
  description: string().trim().required(),
  menu: number().positive().integer().required(),
  image: string().trim().required(),
  active: boolean().required(),
});

export const createProductValidate = yupWrapper(schema);
