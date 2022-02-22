import { object, SchemaOf, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { ShowProductDto } from '../dtos/show-product-dto';

const schema: SchemaOf<ShowProductDto> = object({
  id: number().integer().min(1).required(),
  establishmentId: number().integer().min(1).required(),
});

export const showProductValidate = yupWrapper(schema);
