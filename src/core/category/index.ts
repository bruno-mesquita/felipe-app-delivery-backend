/**
 * @fileoverview Criação da entidade Category
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Category extends Model {
  name: string;

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

  public getName(): string {
    return this.get('name');
  }

  public setName(name: string): void {
    this.set('name', name);
  }
}

export default Category;
