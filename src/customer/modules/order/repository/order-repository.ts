/**
 * @fileoverview Repositório customizado de pedido
 * @author Jonatas Rosa Moura
 */

import { EntityRepository, Repository } from 'typeorm';
import Order from '@core/order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        id,
      },
    });

    return order;
  }
}
