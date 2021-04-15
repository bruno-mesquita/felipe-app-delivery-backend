import { ServiceResponse } from '@shared/utils/service-response';
import Order from '@core/order';
import Client from '@core/client';
import Evaluation from '@core/evaluation';
import Establishment from '@core/establishment';

export class ListOrdersService {
  async execute(userId: number, page = 0): Promise<ServiceResponse<Order[]>> {
    try {
      const client = await Client.findOne({ where: { id: userId, active: true } });

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
        ],
        order: [['createdAt', 'asc']],
        limit: 15,
        offset: page * 15,
      });

      return { err: null, result: orders };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
