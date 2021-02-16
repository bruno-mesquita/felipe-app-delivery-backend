/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';

import { Image } from '@modules/image';

import { Menu } from '@modules/menu';

@Entity('products')
class Product extends EntityBase {
  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image_id: Image;

  @ManyToOne(() => Menu, (menu) => menu.products)
  menu_id: Menu;
}

export default Product;
