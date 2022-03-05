import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class State extends Model {
  declare name: string;

  declare active: boolean;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'state' }
    );

    return this;
  }
}

export default State;
