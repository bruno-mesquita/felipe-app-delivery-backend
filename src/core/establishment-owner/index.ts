import { DataTypes, Sequelize } from 'sequelize';
import { compareSync, hashSync } from 'bcryptjs';

import Establishment from '@core/establishment';
import CityManager from '@core/city-manager';
import Model from '../_Bases/model';

export class EstablishmentOwner extends Model {
  first_name: string;

  last_name: string;

  password: string;

  email: string;

  cellphone: string;

  cpf: string;

  establishment_id: number;

  created_by_id: number;

  public readonly created_by?: CityManager;

  public readonly establishment?: Establishment;

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

  static associate({ Establishment, CityManager }) {
    this.belongsTo(Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });
    this.belongsTo(CityManager, {
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

  public setFirstName(firstName: string): void {
    this.set('first_name', firstName);
  }

  public setLastName(lastName: string): void {
    this.set('last_name', lastName);
  }

  public setEmail(email: string): void {
    this.set('email', email);
  }

  public setCpf(cpf: string): void {
    this.set('cpf', cpf);
  }

  public getEstablishmentId(): number {
    return this.get('establishment_id');
  }

  public setEstablishmentId(establishmentId: number): void {
    this.set('establishment_id', establishmentId);
  }
}
