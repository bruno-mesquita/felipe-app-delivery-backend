/**
 * @fileoverview Criação da entidade Produto
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Image from '@core/image';
import Menu from '@core/menu';

@Entity('products')
class Product extends EntityBase {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image_id: Image;

  @ManyToOne(() => Menu, (menu) => menu.products)
  menu: Menu;
}

export default Product;
