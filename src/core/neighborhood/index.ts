import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Neighborhood extends Model {
  name: string;
  active: boolean;
  cityId: number;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'neighborhood' });

    return this;
  }
}

export default Neighborhood;
