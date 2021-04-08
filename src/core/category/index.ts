/**
 * @fileoverview Criação da entidade Store
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { DataTypes, Sequelize } from 'sequelize';

import EstablishmentCategory from '@core/establishment-category';
import Model from '../_Bases/model';

class Category extends Model {
  name: string;

  static start(sequelize: Sequelize) {
    this.init({ name: DataTypes.STRING }, { sequelize, tableName: 'categories' });

    return this;
  }

  static associate({ Establishment }) {
    this.belongsToMany(Establishment, { through: EstablishmentCategory, foreignKey: 'category_id', as: 'categories' });
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

export default Category;
