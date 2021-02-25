/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Evaluation from '@core/evaluation';
import Client from '@core/client';
import Establishment from '@core/establishment';
import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from './order.types';

@Entity('order')
class Order extends EntityBase {
  @Column()
  request_date: Date;

  @Column({ type: 'varchar' })
  form_of_payment: FormOfPaymentType;

  @Column('decimal')
  total: number;

  @Column('decimal')
  discount: number;

  @Column({ type: 'varchar' })
  client_order_status: CustomerStatusType;

  @Column({ type: 'varchar' })
  order_status: StatusOrderType;

  @Column('decimal')
  freight_value: number;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client_id: Client;

  @OneToOne(() => Evaluation)
  @JoinColumn({ name: 'evaluation_id' })
  evaluation_id: Evaluation;

  @ManyToOne(() => Establishment, (store) => store.orders)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  public updateOrder(form_of_payment: FormOfPaymentType, client_order_status: CustomerStatusType): void {
    this.form_of_payment = form_of_payment;
    this.client_order_status = client_order_status;
  }
}

export default Order;
