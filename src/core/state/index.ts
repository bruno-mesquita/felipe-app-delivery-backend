import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';
class State extends Model {
  name: string;
  active: boolean;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'states' });

    return this;
  }
}

export default State;
