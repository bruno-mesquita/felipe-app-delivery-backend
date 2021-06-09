import { object, SchemaOf, string, number } from 'yup';

import { createMenuStablishmentDto } from '../dtos/create-menu.dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<createMenuStablishmentDto> = object({
  name: string().required(REQUIRED),
  establishmentId: number().integer().required(REQUIRED),
});

export default schema;
