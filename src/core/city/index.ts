import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class City extends Model {
  declare name: string;

  declare active: boolean;

  declare state_id!: number;

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
}

export default City;
