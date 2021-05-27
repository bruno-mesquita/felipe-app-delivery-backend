import { object, SchemaOf, string, number } from 'yup';

import { UpdateMenuStablishmentDto } from '../dtos/update-menu.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateMenuStablishmentDto> = object({
  id: number().required(REQUIRED),
  name: string().required(REQUIRED),
  owner: number().integer().required(REQUIRED),
});

export default schema;
