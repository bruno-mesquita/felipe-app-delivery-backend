/**

 * @fileoverview Criação da entidade State

 *

 * @author Bruno Mesquita

 */

import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity('states')
class State extends EntityBase {
  @Column()
  name: string;
}

export default State;
