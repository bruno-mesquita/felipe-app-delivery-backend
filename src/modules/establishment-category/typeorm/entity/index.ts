/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, OneToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Establishment from '@modules/establishment/typeorm/entity';

@Entity('category_establishment')
class StoreCategory extends EntityBase {
  @Column()
  name: string;
}

export default StoreCategory;
