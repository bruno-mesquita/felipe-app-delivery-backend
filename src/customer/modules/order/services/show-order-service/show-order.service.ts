/**
 * @fileoverview serviço de exibição de um pedido
 * @author Jonatas Rosa Moura
 */

import Establishment from '@core/establishment';
import Order from '@core/order';
import ItemOrder from '@core/item-order';
import Product from '@core/product';
import Evaluation from '@core/evaluation';
import AddressClient from '@core/address-client';
import ApiError from '@shared/utils/ApiError';

export class ShowOrderService {
  async execute(id: number): Promise<{ order: Order; items: ItemOrder[] }> {
    try {
      const order = await Order.findOne({
        where: { id },
        attributes: ['id', 'createdAt', 'total'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            attributes: ['id', 'name'],
          },
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['id', 'value', 'message'],
          },
          {
            model: AddressClient,
            as: 'address_client',
            attributes: ['nickname'],
          },
        ],
      });

      if (!order) throw new ApiError('Pedido não encontrado.');

      const items = await ItemOrder.findAll({
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

      return { order, items };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
