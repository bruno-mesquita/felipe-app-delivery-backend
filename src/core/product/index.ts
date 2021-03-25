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
  image: Image;

  @ManyToOne(() => Menu, (menu) => menu.products)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  public updateProduct(name: string, price: number, description: string, menu: Menu): void {
    this.name = name;
    this.price = price;
    this.description = description;
    this.menu = menu;
  }

  public calcTotal(amount: number): number {
    return this.price * amount;
  }

  public setImage(image: Image) {
    this.image = image;
  }
}

export default Product;
