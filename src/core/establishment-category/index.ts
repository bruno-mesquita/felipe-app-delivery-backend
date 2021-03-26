/**
 * @fileoverview Criação da entidade Store Category
 *
 * @author Jonatas Rosa Moura
 */

import { Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Establishment from '@core/establishment';
import Category from '@core/category';

@Entity('category_establishment')
class EstablishmentCategory extends EntityBase {
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;
}

export default EstablishmentCategory;
