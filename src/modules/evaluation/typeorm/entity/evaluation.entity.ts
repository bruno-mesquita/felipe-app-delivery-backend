/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import EntityBase from '@shared/utils/entity';

import { Order } from '@modules/order';

@Entity('evaluation_order')
class Evaluation extends EntityBase {
  @Column()
  note: string;

  @Column()
  message: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order_id: Order;
}

export default Evaluation;
