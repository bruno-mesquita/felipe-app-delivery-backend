import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import { Evaluation } from '@modules/evaluation';
import { Client } from '@modules/client';
import { Store } from '@modules/store';
import { CustomerStatusOrderType, CustomerStatusType, FormOfPaymentType } from '../../order.types';

@Entity()
class Order extends EntityBase {
  @Column()
  order_date: Date;

  @Column({ type: 'varchar' })
  form_of_payment: FormOfPaymentType;

  @Column()
  discount: number;

  @Column({ type: 'varchar' })
  customer_status_order: CustomerStatusOrderType;

  @Column({ type: 'varchar' })
  customer_status: CustomerStatusType;

  @ManyToOne(() => Client, (client) => client.orders)
  client_id: Client;

  @OneToOne(() => Evaluation)
  @JoinColumn()
  evaluation_id: Evaluation;

  @ManyToOne(() => Store, (store) => store.orders)
  store_id: Store;
}

export default Order;
