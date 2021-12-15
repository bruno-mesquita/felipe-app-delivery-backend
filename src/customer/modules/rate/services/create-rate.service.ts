import Evaluation from '@core/evaluation';
import Order from '@core/order';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { ICreateRateDto } from '../dtos';

export class CreateRateService {
  async execute({ value, message, orderId, clientId }: ICreateRateDto): Promise<ServiceResponse<boolean>> {
    try {
      const order = await Order.findOne({
        where: { id: orderId, client_id: clientId },
      })

      if (!order) throw new Error('Pedido não encontrado');

      const evaluation = await Evaluation.create({
        value,
        message,
      });

      order.setEvaluationId(evaluation.getId());

      await order.save();

      return { err: null, result: true };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
