import Order from '@core/order';
import ApiError from '@shared/utils/ApiError';
import Notification from '@shared/utils/Notification';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateOrderStatusDto } from '../../dtos/update-order.dto';
import { schema } from '../../validations/update-order-status.validation';

export class UpdateOrderStatusServices {
  async execute({
    id,
    establishmentId,
  }: UpdateOrderStatusDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = schema.isValidSync({ id, establishmentId });

      if (!valid) throw new ApiError('Dados inválidos');

      const order = await Order.findOne({
        where: { id, establishment_id: establishmentId },
      });

      if (!order) throw new ApiError('Pedido não encontrado');

      order.nextStatus();

      await order.save();

      const notification = new Notification();

      await notification.send({
        targetId: order.get('client_id'),
        type: 'Client',
        data: {
          title: 'Sobre o seu pedido',
          body: 'O Status do seu pedido mudou',
        },
      });

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
