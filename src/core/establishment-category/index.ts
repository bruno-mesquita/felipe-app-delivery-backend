/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Establishment from '@core/establishment';

@Entity('category_establishment')
class StoreCategory extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => Establishment, (establishment) => establishment.category)
  establishment: Establishment;
}

export default StoreCategory;
