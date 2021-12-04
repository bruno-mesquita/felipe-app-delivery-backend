import { object, SchemaOf, number } from 'yup';

import type { ShowProductDto } from '../dtos/show-product-dto';
import yupWrapper from '@shared/utils/yup-wrapper';

const schema: SchemaOf<ShowProductDto> = object({
  id: number().integer().min(1).required(),
  establishmentId: number().integer().min(1).required(),
});

export const showProductValidate = yupWrapper(schema);
