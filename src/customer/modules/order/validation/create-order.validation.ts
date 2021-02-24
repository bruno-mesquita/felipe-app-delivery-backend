/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, date, number, mixed } from 'yup';
import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from '@core/order/order.types';
import { CreateOrderDto } from '../dtos/create-order.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<CreateOrderDto> = object({
  request_date: date().required(REQUIRED),

  form_of_payment: mixed<FormOfPaymentType>().required(REQUIRED),

  total: number().required(REQUIRED),

  discount: number().required(REQUIRED),

  client_order_status: mixed<CustomerStatusType>().required(REQUIRED),

  order_status: mixed<StatusOrderType>().required(REQUIRED),

  freight_value: number().required(REQUIRED),
});
