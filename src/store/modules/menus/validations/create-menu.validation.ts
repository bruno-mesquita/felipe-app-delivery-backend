import { object, SchemaOf, string } from 'yup';

import { createMenuStablishmentDto } from '../dtos/create-menu.dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<createMenuStablishmentDto> = object({
  name: string().required(REQUIRED),

  establishment: string().uuid().required(REQUIRED),
});

export default schema;
