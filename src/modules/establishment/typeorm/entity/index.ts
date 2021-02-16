/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Address from '@modules/address/typeorm/entity/address.entity';
import { Image } from '@modules/image';
import { StoreCategory } from '@modules/establishment-category';
import { Menu } from '@modules/menu';
import { Order } from '@modules/order';

@Entity('establishment')
class Store extends EntityBase {
  @Column()
  name: string;

  @Column({ unique: true })
  cellphone: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address_id: Address;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image_id: Image;

  @OneToOne(() => StoreCategory)
  @JoinColumn({ name: 'category_id' })
  category_id: StoreCategory;

  @OneToMany(() => Menu, (menu) => menu.establishment_id)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.store_id)
  orders: Order[];
}

export default Store;
