import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import EntityBase from '@shared/entity';
import { Order } from '@domain/order';

@Entity()
class Evaluation extends EntityBase {
  @OneToOne(() => Order)
  @JoinColumn()
  order_id: Order;

  @Column()
  value: string;

  @Column()
  message: string;
}

export default Evaluation;
