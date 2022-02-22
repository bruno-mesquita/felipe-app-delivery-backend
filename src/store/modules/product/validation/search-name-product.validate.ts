import { object, SchemaOf, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import type { SearchNameProductDto } from '../dtos/search-name-product-dto';

const schema: SchemaOf<SearchNameProductDto> = object({
  search: string().trim().required(),
  establishmentId: number().integer().required(),
});

export const searchNameProductValidate = yupWrapper(schema);
