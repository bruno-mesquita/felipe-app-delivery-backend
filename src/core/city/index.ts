import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class City extends Model {
  name: string;

  active: boolean;

  state_id!: number;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'city' }
    );

    return this;
  }

  static associate({ State, Neighborhood }) {
    this.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
    this.hasMany(Neighborhood, {
      foreignKey: 'city',
      as: 'neighborhoods',
      onDelete: 'cascade',
    });
  }

  public setName(name: string): void {
    this.set('name', name);
  }

  public setActive(active: boolean): void {
    this.set('active', active);
  }

  public setStateId(stateId: number): void {
    this.set('state_id', stateId);
  }
}

export default City;
