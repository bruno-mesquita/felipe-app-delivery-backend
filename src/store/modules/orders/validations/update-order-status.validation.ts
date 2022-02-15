import { object, SchemaOf, number } from 'yup';

import { UpdateOrderStatusDto } from '../dtos/update-order.dto';

const schema: SchemaOf<UpdateOrderStatusDto> = object({
  id: number().integer().positive().required(),
  establishmentId: number().integer().positive().required(),
});

export { schema };
