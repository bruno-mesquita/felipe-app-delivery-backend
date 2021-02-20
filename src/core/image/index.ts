/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity('image')
class Image extends EntityBase {
  @Column()
  name: string;

  @Column()
  encoded: string;
}

export default Image;
