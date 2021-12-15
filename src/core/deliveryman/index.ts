import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

export class Deliveryman extends Model {
  name: string;
  cellphone: string;
  entry_date: string;
  departure_date: string;
  city_id: number;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      entry_date: DataTypes.STRING,
      departure_date: DataTypes.STRING,
    }, { sequelize, tableName: 'deliveryman' });

    return this;
  }

  static associate({ City }) {
    this.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
  }

  public getName(): string {
    return this.get('name');
  }

  public setName(name: string): void {
    this.set('name', name);
  }

  public getCellphone(): string {
    return this.get('cellphone');
  }

  public setCellphone(cellphone: string): void {
    this.set('cellphone', cellphone);
  }

  public getEntryDate(): string {
    return this.get('entry_date');
  }

  public setEntryDate(entryDate: string): void {
    this.set('entry_date', entryDate);
  }

  public getDepartureDate(): string {
    return this.get('departure_date');
  }

  public setDepartureDate(departureDate: string): void {
    this.set('departure_date', departureDate);
  }

  public setCityId(cityId: number): void {
    this.set('city_id', cityId);
  }
}
