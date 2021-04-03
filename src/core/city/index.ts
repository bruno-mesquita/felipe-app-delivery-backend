import { Model, DataTypes, Sequelize } from 'sequelize';

class City extends Model {
  id: string;
  name: string;
  active: boolean;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'cities' });

    return this;
  }

  static associate({ State }) {
    this.belongsTo(State, { foreignKey: 'state_id' });
  }
}

export default City;
