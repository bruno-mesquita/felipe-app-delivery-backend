/**
 * @fileoverview Criação da entidade Category
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Category extends Model {
  declare name: string;

  static start(sequelize: Sequelize) {
    this.init({ name: DataTypes.STRING }, { sequelize, tableName: 'category' });

    return this;
  }

  static associate({ EstablishmentCategory }) {
    this.hasMany(EstablishmentCategory, {
      foreignKey: 'category_id',
      as: 'categories',
    });
  }
}

export default Category;
