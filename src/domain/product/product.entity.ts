import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/entity';
import { Image } from '@domain/image';
import { Menu } from '@domain/menu';

@Entity()
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
