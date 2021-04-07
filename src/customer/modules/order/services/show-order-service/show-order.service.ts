/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';

class ShowOrderService {
  async execute(id: string): Promise<ServiceResponse<Order | null>> {
    try {
      const order = await Order.findByPk(id);

      if (!order) throw new Error('Pedido não encontrado.');

      return { result: order, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { ShowOrderService };
