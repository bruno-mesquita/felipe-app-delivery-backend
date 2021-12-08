import { object, string, number, boolean } from 'yup';

import type { UpdateProductDto } from '../dtos/update-product-dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const updateProductValidate = yupWrapper<UpdateProductDto>(object({
  id: number().integer().required(),
  name: string().trim().required(),
  price: number().required(),
  description: string().trim().required(),
  menu: number().integer().required(),
  image: string().trim().required(),
  active: boolean().required(),
}));