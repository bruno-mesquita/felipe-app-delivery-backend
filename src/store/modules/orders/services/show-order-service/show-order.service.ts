import Evaluation from "@core/evaluation";
import ItemOrder from "@core/item-order";
import Order from "@core/order";
import Product from "@core/product";
import { ServiceResponse } from "@shared/utils/service-response";

export interface IRequest {
  id: number;
  clientId: number;
}

export class ShowOrderService {
  async execute({ id }: IRequest): Promise<ServiceResponse<any | null>> {
    try {
      const order = await Order.findOne({
        where: { id },
        attributes: ['id', 'payment', 'total', 'discount', 'order_status', 'createdAt'],
        include: [
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['id', 'value', 'message'],
          },
        ],
      });

      if (!order) throw new Error('Pedido não encontrado');

      const itemsOrder = await ItemOrder.findAll({
        where: { order_id: id },
        attributes: ['quantity', 'total'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['name'],
          },
        ],
      });

      return { result: { order, items: itemsOrder }, err: null };
    } catch(err) {
      return { result: null, err: err.message };
    }
  }
}
