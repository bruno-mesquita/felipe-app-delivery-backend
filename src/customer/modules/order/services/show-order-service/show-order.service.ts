/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Establishment from '@core/establishment';
import Order from '@core/order';
import ItemOrder from '@core/item-order';
import { ServiceResponse } from '@shared/utils/service-response';
import Product from '@core/product';
import Evaluation from '@core/evaluation';

class ShowOrderService {
  async execute(id: number): Promise<ServiceResponse<any | null>> {
    try {
      const order = await Order.findOne({
        attributes: ['id', 'createdAt', 'total'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            attributes: ['id', 'name', 'freightValue'],
          },
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['id', 'value', 'message']
          },
        ]
      });

      if (!order) throw new Error('Pedido não encontrado.');

      const itemsOrder = await ItemOrder.findAll({
        attributes: ['id', 'quantity', 'total'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'price'],
          }
        ]
      })

      console.log(itemsOrder);

      return { result: { order, items: itemsOrder }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { ShowOrderService };
