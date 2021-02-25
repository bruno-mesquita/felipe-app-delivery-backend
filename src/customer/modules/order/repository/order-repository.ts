/**
 * @fileoverview Repositório customizado de pedido
 * @author Jonatas Rosa Moura
 */

import { EntityRepository, Repository } from 'typeorm';
import Order from '@core/order';
import { CustomerStatusType, FormOfPaymentType } from '@core/order/order.types';

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

  async findByPayment(form_of_payment: FormOfPaymentType): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        form_of_payment,
      },
    });

    return order;
  }

  async findByOrderStatus(order_status: CustomerStatusType): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        order_status,
      },
    });

    return order;
  }
}
