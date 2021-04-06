/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

 import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Image extends Model {
  name: string;
  encoded: string;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      encoded: DataTypes.STRING,
    }, { sequelize, tableName: 'images' });

    return this;
  }
}

export default Image;
