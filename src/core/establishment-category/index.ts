/**
 * @fileoverview Criação da entidade Store Category
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class EstablishmentCategory extends Model {
  category_id: number;
  establishment_id: number;

  static start(sequelize: Sequelize) {
    this.init({}, { sequelize, tableName: 'establismnt_category' });

    return this;
  }
}

export default EstablishmentCategory;
