/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import EntityBase from '@shared/utils/entity';

import Establishment from '@core/establishment';
import Product from '@core/product';

@Entity('menu')
class Menu extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => Establishment, (stablishment) => stablishment.menus)
  establishment: Establishment;

  @OneToMany(() => Product, (product) => product.menu)
  products: Product[];
}

export default Menu;
