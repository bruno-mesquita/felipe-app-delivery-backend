import { object, SchemaOf, string } from 'yup';

import { CreateCategoryDtos } from '../dtos/create-category.dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateCategoryDtos> = object({
  name: string().required(REQUIRED),
});

export { schema };
