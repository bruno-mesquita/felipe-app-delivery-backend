import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import { EvaluationRepository } from '@customer/modules/evaluation';
import { OrderRepository } from '../order.repository';
import { RateOrderDto } from '../dtos/rate-order.dto';

export class RateOrderService {
  async execute({ value, message, orderId, userId }: RateOrderDto): Promise<ServiceResponse<boolean>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);
      const evaluationRepository = getCustomRepository(EvaluationRepository);

      const order = await orderRepository.findOne({ where: [{ id: orderId }, { client: userId }] });

      if (!order) throw new Error('Pedido não encontrado');

      const evaluation = evaluationRepository.create({
        value,
        message,
      });

      await evaluationRepository.save(evaluation);

      order.setEvaluation(evaluation);

      await orderRepository.save(order);

      return { err: null, result: true };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}
