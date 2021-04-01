/**
 * @fileoverview Serviço de tipagem dos parâmetros exclusivos de Pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType } from '@core/order/order.types';

export interface Item {
  amount: number;
  price: number;
  itemId: string; // produto
  total: number;
}

export interface CreateOrderDto {
  establishmentId: string;
  items: Item[];
  total: number;
  payment: FormOfPaymentType;
}
