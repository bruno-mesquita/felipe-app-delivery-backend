import { Sequelize, DataTypes } from 'sequelize';

import Model from '@core/_Bases/model';

export type IFreightAttributes = {
  price: number;
  establishmentId: number;
  neighborhoodId: number;
};

class Freight extends Model {
  declare price: number;

  declare establishmentId: number;

  declare neighborhoodId: number;

  static start(sequelize: Sequelize) {
    this.init(
      {
        price: DataTypes.STRING,
      },
      { sequelize, tableName: 'freight' }
    );

    return this;
  }
}

export default Freight;
