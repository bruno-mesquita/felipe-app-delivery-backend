/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../../order.repository';

class ShowOrderService {
  async execute(id: string): Promise<ServiceResponse<Order | null>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      const order = await orderRepository.findOne(id);

      if (!order) throw new Error('Pedido não encontrado.');

      return { result: order, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { ShowOrderService };
