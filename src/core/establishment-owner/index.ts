import { DataTypes, Sequelize, BelongsToGetAssociationMixin } from 'sequelize';
import { compareSync, hashSync } from 'bcryptjs';

import Establishment from '@core/establishment';
import CityManager from '@core/city-manager';
import Model from '../_Bases/model';

export class EstablishmentOwner extends Model {
  declare first_name: string;

  declare last_name: string;

  declare password: string;

  declare email: string;

  declare cellphone: string;

  declare cpf: string;

  declare establishment_id: number;

  declare created_by_id: number;

  declare created_by?: CityManager;

  declare establishment?: Establishment;

  declare getEstablishment: BelongsToGetAssociationMixin<Establishment>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        cpf: DataTypes.STRING,
      },
      { sequelize, tableName: 'establishment-owner' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });
    this.belongsTo(models.CityManager, {
      foreignKey: 'created_by_id',
      as: 'created_by',
    });
  }

  public hashPassword(): void {
    this.set('password', hashSync(this.get('password'), 8));
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.get('password'));
  }

  public setPassword(password: string): void {
    this.set('password', password);
  }

  public getEstablishmentId(): number {
    return this.get('establishment_id');
  }
}
