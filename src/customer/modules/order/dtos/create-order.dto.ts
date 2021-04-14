/**
 * @fileoverview Serviço de tipagem dos parâmetros exclusivos de Pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType } from '@core/order/order.types';

export interface Item {
  amount: number; // quantidade
  price: number;
  itemId: number; // produto
  total: number;
}

export interface CreateOrderDto {
  establishment_id: number;
  client_id: number;
  address_id: number;
  items: Item[];
  total: number;
  payment: FormOfPaymentType;
}
