import { Model, DataTypes, Sequelize } from 'sequelize';

class City extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      state: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'cities' });
  }
}

export default City;
