/**
 * @fileoverview entidade de produtos
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Menu extends Model {
  name: string;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.NUMBER,
/*       establishment: DataTypes.UUIDV4, */
    }, { sequelize, tableName: 'menus' });

    return this;
  }
}

export default Menu;
