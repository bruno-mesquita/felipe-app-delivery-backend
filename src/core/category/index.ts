/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Category extends Model {
  static start(sequelize: Sequelize) {
    this.init({ name: DataTypes.STRING }, { sequelize, tableName: 'categories' });

    return this;
  }
}

export default Category;
