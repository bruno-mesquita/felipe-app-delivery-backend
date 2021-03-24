import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import Order from '@core/order';
import ClientRepository from '../../client.repository';

export class ListOrdersService {
  async execute(userId: string): Promise<ServiceResponse<Order[]>> {
    try {
      const userRepository = getCustomRepository(ClientRepository);

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
