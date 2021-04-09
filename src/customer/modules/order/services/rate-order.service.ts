import Evaluation from '@core/evaluation';
import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { RateOrderDto } from '../dtos/rate-order.dto';

export class RateOrderService {
  async execute({ value, message, orderId, userId }: RateOrderDto): Promise<ServiceResponse<boolean>> {
    try {
      const order = await Order.findOne({
        where: { id: orderId, user_id: userId },
      })

      if (!order) throw new Error('Pedido não encontrado');

      const evaluation = await Evaluation.create({
        value,
        message,
      });

      order.setEvaluationId(evaluation.id);

      await order.save();

      return { err: null, result: true };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
