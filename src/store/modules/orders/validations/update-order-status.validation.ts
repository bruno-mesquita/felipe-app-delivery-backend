import { object, SchemaOf, number } from 'yup';

import { UpdateOrderStatusDto } from '../dtos/update-order.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateOrderStatusDto> = object({
  id: number().integer().required(),
  establishmentId: number().integer().required(),
});

export { schema };
