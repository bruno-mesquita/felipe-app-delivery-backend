/**
 * @fileoverview Serviço de tipagem dos parâmetros exclusivos de Pedidos
 * @author Jonatas Rosa Moura
 */

export interface Item {
  amount: number;
  price: number;
  itemId: string; // produto
  total: number;
}

export interface CreateOrderDto {
  establishmentId: string;
  items: Item[];
  fee: number;
  total: number;
  payment: string;
}
