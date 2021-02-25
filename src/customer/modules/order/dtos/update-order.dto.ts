/**
 * @fileoverview Serviço de tipagem dos parâmetros exclusivos de update dos Pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType, CustomerStatusType } from '@core/order/order.types';

export interface UpdateOrderDto {
  id: string;

  // request_date: Date | undefined; // data do pedido

  form_of_payment: FormOfPaymentType; // forma de pagamento

  // total: number;

  // discount: number; // disconto

  client_order_status: CustomerStatusType;

  // order_status: StatusOrderType;

  // freight_value: number; // valor do frete
}
