import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity()
class StoreCategory extends EntityBase {
  @Column()
  name: string;
}

export default StoreCategory;
