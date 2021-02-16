/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import { Evaluation } from '@modules/evaluation';
import { Client } from '@modules/client';
import { Store } from '@modules/establishment';
import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from '../../order.types';

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
  @JoinColumn()
  evaluation_id: Evaluation;

  @ManyToOne(() => Store, (store) => store.orders)
  store_id: Store;
}

export default Order;
