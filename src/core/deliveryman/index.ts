import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

export class Deliveryman extends Model {
  name: string;
  cellphone: string;
  entry_date: string;
  departure_date: string;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      entry_date: DataTypes.STRING,
      departure_date: DataTypes.STRING,
    }, { sequelize, tableName: 'deliveryman' });

    return this;
  }
}
