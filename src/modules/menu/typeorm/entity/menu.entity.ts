/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';

import { Store } from '@modules/establishment';

import { Product } from '@modules/product';

@Entity('menu')
class Menu extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => Store, (stablishment) => stablishment.menus)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Store;

  @ManyToOne(() => Product, (product) => product.menu)
  products: Product[];
}

export default Menu;
