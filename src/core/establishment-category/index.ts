/**
 * @fileoverview Criação da entidade Store Category
 */

import { Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class EstablishmentCategory extends Model {
  category_id: number;
  establishment_id: number;

  static start(sequelize: Sequelize) {
    this.init({}, { sequelize, tableName: 'establismnt_category' });

    return this;
  }

  static associate({ Category, Establishment }) {
    this.belongsTo(Category, { foreignKey: 'category_id', as: 'categories' });
    this.belongsTo(Establishment, { foreignKey: 'establishment_id', as: 'category_establishment' });
  }
}

export default EstablishmentCategory;
