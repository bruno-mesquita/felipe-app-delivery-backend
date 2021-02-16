/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';

import { Store } from '@modules/establishment';

import { Product } from '@modules/product';

@Entity('menu')
class Menu extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => Store, (store) => store.menus)
  store_id: Store;

  @ManyToOne(() => Product, (product) => product.menu_id)
  products: Product[];
}

export default Menu;
