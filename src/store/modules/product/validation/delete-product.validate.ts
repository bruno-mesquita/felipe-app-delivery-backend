import { object, number } from 'yup';

import type { DeleteProductDto } from '../dtos/delete-product-dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const deleteProductValidate = yupWrapper<DeleteProductDto>(object({
  establishmentId: number().integer().min(1).required(),
  menuId: number().integer().min(1).required(),
  productId: number().integer().min(1).required(),
}));
