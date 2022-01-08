/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class VerifyStatusOrderService {
  async execute(id: number): Promise<ServiceResponse<string>> {
    try {
      const order = await Order.findOne({ where: { id }, attributes: ['client_order_status'] });

      if (!order) throw new ApiError('Pedido não encontrado.');

      return { result: order.getClientOrderStatus(), err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
