import { Model, DataTypes, Sequelize } from 'sequelize';

class State extends Model {
  name: string;
  active: boolean;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active:  DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'states' });
  }
}

export default State;
