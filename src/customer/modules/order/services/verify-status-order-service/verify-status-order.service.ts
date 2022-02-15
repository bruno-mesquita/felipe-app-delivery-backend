/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import ApiError from '@shared/utils/ApiError';

export class VerifyStatusOrderService {
  async execute(id: number): Promise<string> {
    try {
      const order = await Order.findOne({ where: { id }, attributes: ['client_order_status'] });

      if (!order) throw new ApiError('Pedido não encontrado.');

      return order.getClientOrderStatus();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
