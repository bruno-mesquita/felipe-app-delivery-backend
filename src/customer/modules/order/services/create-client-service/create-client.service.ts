/**
 * @fileoverview Casos serviços para a criação do pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { OrderRepository } from '../../repository/order-repository';

export class CreateOrderService {
  async execute(orderProps: CreateOrderDto): Promise<ServiceResponse<Order | null>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      const order = orderRepository.create(orderProps);

      await orderRepository.save(order);

      return { result: order, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
