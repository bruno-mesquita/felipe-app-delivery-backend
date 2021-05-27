import {
  DataTypes,
  Sequelize,
} from 'sequelize';
import { compareSync, hashSync } from 'bcryptjs';

import Establishment from '@core/establishment';
import Model from '../_Bases/model';

export class EstablishmentOwner extends Model {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  cellphone: string;
  cpf: string;
  establishment_id: number;

  public readonly establishment?: Establishment;

  static start(sequelize: Sequelize) {
    this.init({
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      cpf: DataTypes.STRING,
    }, { sequelize, tableName: 'establishment-owners' });

    return this;
  }

  static associate({ Establishment }) {
    this.belongsTo(Establishment, { foreignKey: 'establishment_id', as: 'establishment' });
  }

  public hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}
