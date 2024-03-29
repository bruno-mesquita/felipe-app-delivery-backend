import Establishment from '@core/establishment';
import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

export class Ticket extends Model {
  barcode: string;

  date_created: string;

  price: number;

  status: 'pending' | 'approved' | 'cancelled';

  link: string;

  status_detail: string;

  verification_code: string;

  payment_method_reference_id: string;

  date_of_expiration: Date;

  date_last_updated: string;

  reference_id: number;

  establishment_id: number;

  public readonly establishment?: Establishment;

  static start(sequelize: Sequelize) {
    this.init(
      {
        barcode: DataTypes.STRING,
        date_created: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        status: DataTypes.STRING,
        link: DataTypes.STRING,
        status_detail: DataTypes.STRING,
        verification_code: DataTypes.STRING,
        payment_method_reference_id: DataTypes.STRING,
        date_of_expiration: DataTypes.DATE,
        date_last_updated: DataTypes.STRING,
        reference_id: DataTypes.NUMBER,
      },
      { sequelize, tableName: 'ticket' }
    );

    return this;
  }

  static associate({ Establishment }) {
    this.belongsTo(Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });
  }

  cancel() {
    this.set('status', 'cancelled');
  }
}
