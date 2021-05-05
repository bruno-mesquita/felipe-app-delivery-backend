import { Op } from "sequelize/types";
import Order from "@core/order";
import { ServiceResponse } from "@shared/utils/service-response";
import { UpdateOrderStatusDto } from '../../dtos/update-order.dto';
import { schema } from '../../validations/update-order-status.validation';

export class UpdateOrderStatusServices {
  async execute({ id, order_status }: UpdateOrderStatusDto): Promise<ServiceResponse<boolean>> {
    try {
      console.log({ id, order_status });
      const valid = schema.isValidSync({ id, order_status });

      if (!valid) throw new Error('Dados inválidos');

      const order = await Order.findOne({
        where: { id, order_status },
      });

      if (!order) throw new Error('Pedido não encontrado');

      order.setOrderStatus(order_status);

      await order.save();

      return { result: true, err: null };
    } catch(err) {
      return { result: false, err: err.message };
    }
  }
}
