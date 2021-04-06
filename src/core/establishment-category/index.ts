/**
 * @fileoverview Criação da entidade Store Category
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class EstablishmentCategory extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      category: DataTypes.UUIDV4,
      establishment: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'establismnt_category' });

    return this;
  }
}

export default EstablishmentCategory;
