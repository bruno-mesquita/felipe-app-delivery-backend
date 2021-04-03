/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';


class Category extends Model {
  static start(sequelize: Sequelize) {
    this.init({ name: DataTypes.STRING }, { sequelize, tableName: 'categories' });

    return this;
  }
}

export default Category;
