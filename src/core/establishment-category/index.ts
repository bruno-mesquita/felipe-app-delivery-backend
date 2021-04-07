/**
 * @fileoverview Criação da entidade Store Category
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class EstablishmentCategory extends Model {
  category_id: string;
  establishment_id: string;

  static start(sequelize: Sequelize) {
    this.init({}, { sequelize, tableName: 'establismnt_category' });

    return this;
  }
}

export default EstablishmentCategory;
