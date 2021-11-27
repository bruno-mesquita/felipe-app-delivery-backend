import { object, SchemaOf, number } from 'yup';

import { CacelOrderDto } from '../dtos/cancel-order.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CacelOrderDto> = object({
  id: number().integer().required(),
  establishmentId: number().integer().required(),
});

export { schema };
