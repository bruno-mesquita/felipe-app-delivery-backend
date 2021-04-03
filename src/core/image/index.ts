/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';

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
