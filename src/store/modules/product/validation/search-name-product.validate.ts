import { object, SchemaOf, string, number } from 'yup';

import type { SearchNameProductDto } from '../dtos/search-name-product-dto';
import yupWrapper from '@shared/utils/yup-wrapper';

const schema: SchemaOf<SearchNameProductDto> = object({
  search: string().trim().required(),
  establishmentId: number().integer().required(),
});

export const searchNameProductValidate = yupWrapper(schema);
