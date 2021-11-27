import { object, SchemaOf, string, number } from 'yup';

import { UpdateImageDto } from '../dtos/update-image.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateImageDto> = object({
  onwerId: number().integer().required(),
  encoded: string().required(),
});

export default schema;
