/**
 *  @fileoverview Serviços de listagem de pedidos
 *  @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../../repository/order-repository';

class ListOrderSerive {
  async execute(userId: string): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrderRepository);

    const orders = await ordersRepository.findByUserId(userId);

    return orders;
  }
}

export { ListOrderSerive };
