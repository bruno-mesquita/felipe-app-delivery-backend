import { object, SchemaOf, number, mixed } from 'yup';

import { ListOrdersDto } from '../dtos/list-orders-types.dto';
import { StatusOrderType } from '@core/order/order.types';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<ListOrdersDto> = object({
  id: number().integer().required(REQUIRED),
  page: number(),
  types: mixed<StatusOrderType>().oneOf(['Aberto', 'Em andamento', 'Finalizado', 'Cancelado']).required(REQUIRED),
});

export { schema };
