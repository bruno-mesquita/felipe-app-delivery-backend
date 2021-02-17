/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Address from '@modules/address/typeorm/entity/address.entity';
import { Image } from '@modules/image';
import { StoreCategory } from '@modules/establishment-category';
import { Menu } from '@modules/menu';
import { Order } from '@modules/order';
import { hashSync } from 'bcryptjs';

@Entity('establishment')
class Establishment extends EntityBase {
  @Column()
  name: string;

  @Column({ unique: true })
  cellphone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  // Relacionamento de outras tabelas

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @OneToOne(() => StoreCategory)
  @JoinColumn({ name: 'category_id' })
  category: StoreCategory;

  // Relacionamento para outras tabelas

  @OneToMany(() => Menu, (menu) => menu.establishment)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.establishment)
  orders: Order[];

  // funcionalidaddes

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }
}

export default Establishment;
