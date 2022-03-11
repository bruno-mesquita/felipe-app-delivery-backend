import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Image extends Model {
  declare name: string;

  declare encoded: string;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        encoded: DataTypes.STRING,
      },
      { sequelize, tableName: 'image' }
    );

    return this;
  }
}

export default Image;
