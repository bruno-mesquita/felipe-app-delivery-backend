import { Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class EstablishmentCategory extends Model {
  declare category_id: number;

  declare establishment_id: number;

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
