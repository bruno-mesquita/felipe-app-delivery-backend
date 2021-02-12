import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import Address from '@modules/address/typeorm/entities/address.entity';
import { Image } from '@modules/image';
import { StoreCategory } from '@modules/store-category';
import { Menu } from '@modules/menu';
import { Order } from '@modules/order';

@Entity()
class Store {
  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address_id: Address;

  @OneToOne(() => Image)
  @JoinColumn()
  image_id: Image;

  @OneToOne(() => StoreCategory)
  @JoinColumn()
  category_id: StoreCategory;

  @OneToMany(() => Menu, (menu) => menu.store_id)
  menus: Menu[];

  @OneToOne(() => Order, (order) => order.store_id)
  orders: Order[];
}

export default Store;
