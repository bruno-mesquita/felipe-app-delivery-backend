/**
 *  @fileoverview Serviços de listagem de pedidos
 *  @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../../repository/order-repository';

class ListOrderSerive {
  async execute(): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrderRepository);

    const order = await ordersRepository.find();

    return order;
  }
}

export { ListOrderSerive };
