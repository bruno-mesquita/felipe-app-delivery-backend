/**
 * @fileoverview Criação da entidade Store Category
 */

import { Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class EstablishmentCategory extends Model {
  category_id: number;

  establishment_id: number;

  static start(sequelize: Sequelize) {
    this.init({}, { sequelize, tableName: 'establishment_category' });

    return this;
  }

  static associate({ Category, Establishment }) {
    this.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
    this.belongsTo(Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });
  }
}

export default EstablishmentCategory;
