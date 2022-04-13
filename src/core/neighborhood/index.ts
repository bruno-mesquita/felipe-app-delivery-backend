import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Neighborhood extends Model {
  declare name: string;

  declare active: boolean;

  declare city: number;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'neighborhood' }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Freight, {
      foreignKey: 'neighborhoodId',
      as: 'freights',
      sourceKey: 'id',
    });
  }
}

export default Neighborhood;
