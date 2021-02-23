/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, date, number, string } from 'yup';
import { CreateOrderDto } from '../dtos/create-order.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<CreateOrderDto> = object({
  request_date: date().required(REQUIRED),

  form_of_payment: string().required(REQUIRED),

  total: number().required(REQUIRED),

  discount: number().required(REQUIRED),

  client_order_status: object().required(REQUIRED),

  order_status: string().required(REQUIRED),

  freight_value: number().required(REQUIRED),
});
