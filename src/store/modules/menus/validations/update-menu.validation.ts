import { object, SchemaOf, string, number } from 'yup';

import { UpdateMenuStablishmentDto } from '../dtos/update-menu.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateMenuStablishmentDto> = object({
  id: number().required(),
  name: string().required(),
  establishmentId: number().integer().required(),
});

export default schema;
