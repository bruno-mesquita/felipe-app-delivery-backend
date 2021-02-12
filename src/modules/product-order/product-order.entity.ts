import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import { Product } from '@modules/product';
import { Order } from '@modules/order';

@Entity()
class ProductOrder extends EntityBase {
  @Column()
  amount: number;

  @Column()
  total: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product_id: Product;

  @OneToOne(() => Order)
  @JoinColumn()
  order_id: Order;
}

export default ProductOrder;
