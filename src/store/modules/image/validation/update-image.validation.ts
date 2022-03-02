import { object, SchemaOf, string, number } from 'yup';

import { UpdateImageDto } from '../dtos/update-image.dto';

const schema: SchemaOf<UpdateImageDto> = object({
  establishmentId: number().integer().positive().required(),
  encoded: string().trim().required(),
});

export default schema;
