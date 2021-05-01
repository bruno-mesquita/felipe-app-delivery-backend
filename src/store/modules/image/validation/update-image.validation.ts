import { object, SchemaOf, string, number } from 'yup';

import { UpdateImageDto } from '../dtos/update-image.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateImageDto> = object({
  id: number().integer().required(REQUIRED),

  encoded: string().required(REQUIRED),
});

export default schema;
