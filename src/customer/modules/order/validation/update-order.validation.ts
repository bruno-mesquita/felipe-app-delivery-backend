/**
 * @fileoverview Criação do schema de validade para update de pedidos
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, string, mixed } from 'yup';
import { CustomerStatusType, FormOfPaymentType } from '@core/order/order.types';
import { UpdateOrderDto } from '../dtos/update-order.dto';

export const schema: SchemaOf<UpdateOrderDto> = object({
  id: string().trim().required(),

  form_of_payment: mixed<FormOfPaymentType>().required(),

  client_order_status: mixed<CustomerStatusType>().required(),
});
