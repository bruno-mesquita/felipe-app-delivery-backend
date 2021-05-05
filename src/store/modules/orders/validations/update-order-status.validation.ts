import { StatusOrderType } from '@core/order/order.types';
import { object, SchemaOf, string, number, mixed } from 'yup';

import { UpdateOrderStatusDto } from '../dtos/update-order.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateOrderStatusDto> = object({
  id: number().integer().required(REQUIRED),
  order_status: mixed<StatusOrderType>().required(REQUIRED),
});

export { schema };
