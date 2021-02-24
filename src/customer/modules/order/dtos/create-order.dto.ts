/**
 * @fileoverview Serviço de tipagem dos parâmetros exclusivos de Pedidos
 * @author Jonatas Rosa Moura
 */

import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from '@core/order/order.types';

export interface CreateOrderDto {
  request_date: Date | undefined; // data do pedido

  form_of_payment: FormOfPaymentType; // forma de pagamento

  total: number;

  discount: number; // disconto

  client_order_status: CustomerStatusType;

  order_status: StatusOrderType;

  freight_value: number; // valor do frete
}
