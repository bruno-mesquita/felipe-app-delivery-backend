/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';

class VerifyStatusOrderService {
  async execute(id: number): Promise<ServiceResponse<string>> {
    try {
      const order = await Order.findOne({ where: { id }, attributes: ['client_order_status'] });

      if (!order) throw new Error('Pedido não encontrado.');

      return { result: order.client_order_status, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { VerifyStatusOrderService };
