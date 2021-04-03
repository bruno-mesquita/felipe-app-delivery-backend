import { ServiceResponse } from '@shared/utils/service-response';
import Order from '@core/order';

export class ListOrdersService {
  async execute(userId: string): Promise<ServiceResponse<Order[]>> {
    try {
      const client = await userRepository.findOne({
        where: { id: userId },
        relations: ['orders', 'orders.establishment', 'orders.evaluation'],
      });

      if (!client) throw new Error('Cliente não encontrado');

      return { err: null, result: client.orders };
    } catch (err) {
      return { err: err.message, result: [] };
    }
  }
}
