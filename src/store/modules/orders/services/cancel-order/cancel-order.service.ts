import Order from '@core/order';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { CacelOrderDto } from '../../dtos/cancel-order.dto';
import { schema } from '../../validations/cancel-order.validation';

export class CancelOrderService {
  async execute({
    id,
    establishmentId,
  }: CacelOrderDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = schema.isValidSync({ id, establishmentId });

      if (!valid) throw new ApiError('Dados inválidos');

      const cancelOrder = await Order.findOne({
        where: { id, establishment_id: establishmentId },
      });

      if (!cancelOrder) throw new ApiError('Pedido não encontrado');

      cancelOrder.cancel();

      await cancelOrder.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
