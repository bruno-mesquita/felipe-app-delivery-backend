import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity('category_establishment')
class StoreCategory extends EntityBase {
  @Column()
  name: string;
}

export default StoreCategory;
