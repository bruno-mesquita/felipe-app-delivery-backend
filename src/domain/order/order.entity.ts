import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/entity';
import { Evaluation } from '@domain/evaluation';
import { User } from '@domain/user';
import { Store } from '@domain/store';
import {
  CustomerStatusOrderType,
  CustomerStatusType,
  FormOfPaymentType,
} from './order.types';

@Entity()
class Order extends EntityBase {
  @Column()
  order_date: Date;

  @Column()
  form_of_payment: FormOfPaymentType;

  @Column()
  discount: number;

  @Column()
  customer_status_order: CustomerStatusOrderType;

  @Column()
  customer_status: CustomerStatusType;

  @ManyToOne(() => User, (user) => user.orders)
  user_id: string;

  @OneToOne(() => Evaluation)
  @JoinColumn()
  evaluation_id: Evaluation;

  @ManyToOne(() => Store, (store) => store.orders)
  store_id: Store;
}

export default Order;
