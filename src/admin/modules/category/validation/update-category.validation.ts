import { object, SchemaOf, string } from 'yup';

import { UpdateCategoryDtos } from '../dtos/update-category.dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateCategoryDtos> = object({
  id: string().uuid().required(REQUIRED),
  name: string().required(REQUIRED),
});

export { schema };
