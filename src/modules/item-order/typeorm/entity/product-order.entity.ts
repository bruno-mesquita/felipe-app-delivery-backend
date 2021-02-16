/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import EntityBase from '@shared/utils/entity';

import { Product } from '@modules/product';

import { Order } from '@modules/order';

@Entity('item_order')
class ItemOrder extends EntityBase {
  @Column()
  quantity: number;

  @Column('decimal')
  total: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: Product;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order_id: Order;
}

export default ItemOrder;
