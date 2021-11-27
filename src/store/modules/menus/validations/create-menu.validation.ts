import { object, SchemaOf, string, number } from 'yup';

import { createMenuStablishmentDto } from '../dtos/create-menu.dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<createMenuStablishmentDto> = object({
  name: string().required(),
  establishmentId: number().integer().required(),
});

export default schema;
