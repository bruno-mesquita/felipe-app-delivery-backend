import Order from "@core/order";
import { ServiceResponse } from "@shared/utils/service-response";
import { UpdateOrderStatusDto } from '../../dtos/update-order.dto';
import { schema } from '../../validations/update-order-status.validation';

export class UpdateOrderStatusServices {
  async execute({ id, establishmentId }: UpdateOrderStatusDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = schema.isValidSync({ id, establishmentId });

      if (!valid) throw new Error('Dados inválidos');

      const order = await Order.findOne({
        where: { id, establishment_id: establishmentId },
      });

      if (!order) throw new Error('Pedido não encontrado');

      order.nextStatus();

      await order.save();

      return { result: true, err: null };
    } catch(err) {
      return { result: false, err: err.message };
    }
  }
}
