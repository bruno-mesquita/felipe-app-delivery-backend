/**

 * @fileoverview Casos serviços para a criação do pedido

 * @author Jonatas Rosa Moura

 */

import { getCustomRepository } from 'typeorm';

import { ItemOrderRepository } from '@customer/modules/item-order/item-order.repository';
import { ServiceResponse } from '@shared/utils/service-response';
import { ProductRepository } from '@store/modules/product/repository/product.repository';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { OrderRepository } from '../../order.repository';
import { schema } from '../../validation/create-order.validation';

export class CreateOrderService {
  async execute(orderProps: CreateOrderDto): Promise<ServiceResponse<any>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      const itemOrderRepository = getCustomRepository(ItemOrderRepository);

      const productRepository = getCustomRepository(ProductRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(orderProps);

      if (!valid) throw new Error('[erro]: Por favor reveja os parâmetros que você digitou');

      // Buscando o estabelecimento do pedido

      const establishmentId = await orderRepository.findByEstablishmentId(orderProps.establishmentId);

      if (!establishmentId) throw new Error('[erro]: Estabelecimento não encontrado');

      const order = orderRepository.create(orderProps);

      order.open();

      // Salvando no db

      await orderRepository.save(order);

      let total = 0;

      // Verificar os produtos

      orderProps.items.map(async (item) => {
        const product = await productRepository.findById(item.itemId);

        if (product) {
          const tot = product.calcTotal(item.amount);

          total += tot;

          const itemOrder = itemOrderRepository.create({
            product_id: product,

            order_id: order,

            quantity: item.amount,

            total: tot,
          });

          await itemOrderRepository.save(itemOrder);
        }
      });

      order.setTotal(total);

      const totalOrder = order.calcTotal();

      // Salvando no db

      await orderRepository.save(order);

      return { result: { totalOrder }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
