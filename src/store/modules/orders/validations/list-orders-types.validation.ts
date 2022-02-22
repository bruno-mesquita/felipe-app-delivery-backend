import { object, SchemaOf, number, mixed, array } from 'yup';

import { CustomerStatusType } from '@core/order/order.types';
import { ListOrdersDto } from '../dtos/list-orders-types.dto';

const schema: SchemaOf<ListOrdersDto> = object({
  id: number().integer().required(),
  page: number(),
  types: array().of(
    mixed<CustomerStatusType>().oneOf([
      'Novo',
      'Aceito',
      'Cancelado',
      'Em preparo',
      'Entregue',
      'Saiu para entrega',
    ])
  ),
});

export { schema };
