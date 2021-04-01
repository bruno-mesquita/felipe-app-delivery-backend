/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../../order.repository';

class VerifyStatusOrderService {
  async execute(id: string): Promise<ServiceResponse<string>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      const order = await orderRepository.findOne({ where: { id }, select: ['client_order_status'] });

      if (!order) throw new Error('Pedido não encontrado.');

      return { result: order.getClientOrderStatus(), err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { VerifyStatusOrderService };
