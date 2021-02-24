/**
 * @fileoverview Casos serviços para a criação do pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { OrderRepository } from '../../repository/order-repository';
import { schema } from '../../validation/create-order.validation';

export class CreateOrderService {
  async execute(orderProps: CreateOrderDto): Promise<ServiceResponse<Order | null>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(orderProps);

      if (!valid) throw new Error('[erro]: Por favor reveja os parâmetros que você digitou');

      // Criando classe

      const order = orderRepository.create(orderProps);

      // Salvando no db

      await orderRepository.save(order);

      return { result: order, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
