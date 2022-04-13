import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

export class Deliveryman extends Model {
  declare name: string;

  declare cellphone: string;

  declare entry_date: string;

  declare departure_date: string;

  declare city_id: number;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        entry_date: DataTypes.STRING,
        departure_date: DataTypes.STRING,
      },
      { sequelize, tableName: 'deliveryman' }
    );

    return this;
  }

  static associate({ City }) {
    this.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
  }
}
