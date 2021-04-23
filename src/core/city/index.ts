import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';
class City extends Model {
  name: string;
  active: boolean;
  state_id!: number;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'cities' });

    return this;
  }

  static associate({ State }) {
    this.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setActive(active: boolean): void {
    this.active = active;
  }
}

export default City;
