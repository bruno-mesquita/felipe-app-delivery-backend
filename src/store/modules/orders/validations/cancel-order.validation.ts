import { object, SchemaOf, number } from 'yup';

import { CacelOrderDto } from '../dtos/cancel-order.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CacelOrderDto> = object({
  id: number().integer().required(REQUIRED),
  establishmentId: number().integer().required(REQUIRED),
});

export { schema };
