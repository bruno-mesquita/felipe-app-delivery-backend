/**
 * @fileoverview Casos serviços para a criação do pedido
 * @author Jonatas Rosa Moura
 */

import Order from '@core/order';
import ClientRepository from '@customer/modules/client/client.repository';
import { ItemOrderRepository } from '@customer/modules/item-order/item-order.repository';
import { ServiceResponse } from '@shared/utils/service-response';
import { ProductRepository } from '@store/modules/product/repository/product.repository';
import { getCustomRepository } from 'typeorm';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { OrderRepository } from '../../repository/order-repository';
import { schema } from '../../validation/create-order.validation';

export class CreateOrderService {
  async execute(orderProps: CreateOrderDto): Promise<ServiceResponse<Order | null>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);
      const itemOrderRepository = getCustomRepository(ItemOrderRepository);
      const productRepository = getCustomRepository(ProductRepository);
      const clientRepository = getCustomRepository(ClientRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(orderProps);

      if (!valid) throw new Error('[erro]: Por favor reveja os parâmetros que você digitou');

      // Buscando o estabelecimento do pedido

      const establishmentId = await orderRepository.findByEstablishmentId(orderProps.establishmentId);

      if (!establishmentId) throw new Error('[erro]: Estabelecimento não encontrado');

      // Buscando a quantidade do(s) produtos

      const amountProduct = await itemOrderRepository.findByAmount(orderProps.items);

      // buscando o preço do pedido

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
