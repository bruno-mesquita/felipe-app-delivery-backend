import { object, string, number, boolean } from 'yup';

import type { UpdateProductDto } from '../dtos/update-product-dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const updateProductValidate = yupWrapper<Omit<UpdateProductDto, 'menu_id'>>(object({
  id: number().integer().positive(),
  name: string().trim(),
  price: number().positive(),
  description: string().trim(),
  menu: number().integer().positive(),
  image: string().trim(),
  active: boolean(),
}));
