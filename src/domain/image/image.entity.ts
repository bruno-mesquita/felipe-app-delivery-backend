import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/entity';

@Entity()
class Image extends EntityBase {
  @Column()
  name: string;

  @Column()
  encoded: string;
}

export default Image;
