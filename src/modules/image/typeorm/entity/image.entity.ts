/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 */

import { Column, Entity, OneToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import { Client } from '@modules/client';
import Establishment from '@modules/establishment/typeorm/entity';

@Entity('image')
class Image extends EntityBase {
  @Column()
  name: string;

  @Column()
  encoded: string;

  @OneToOne(() => Client, (client) => client.image)
  client: Client;
}

export default Image;
