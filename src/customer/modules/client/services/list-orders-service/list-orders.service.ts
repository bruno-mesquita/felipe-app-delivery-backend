import { ServiceResponse } from '@shared/utils/service-response';
import Order from '@core/order';
import Client from '@core/client';
import Evaluation from '@core/evaluation';
import Establishment from '@core/establishment';

export class ListOrdersService {
  async execute(userId: string): Promise<ServiceResponse<Order[]>> {
    try {
      const client = await Client.findByPk(userId);

      if(!client) throw new Error('Cliente não encontrado');

      const orders = await client.getOrders({
        attributes: ['id', 'total', 'order_status', 'createdAt'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            attributes: ['id', 'name'],
          },
          {
            model: Evaluation,
            as: 'evaluation',
            attributes: ['id', 'value'],
          }
        ]
      });

      return { err: null, result: orders };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
