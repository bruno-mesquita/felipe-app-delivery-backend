import { Column, Entity, ManyToOne } from 'typeorm';

import EntityBase from '@shared/entity';
import { Store } from '@domain/store';
import { Product } from '@domain/product';

@Entity()
class Menu extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => Store, (store) => store.menus)
  store_id: Store;

  @ManyToOne(() => Product, (product) => product.menu_id)
  products: Product[];
}

export default Menu;
