import { DataTypes, Sequelize } from 'sequelize';
import { compareSync, hashSync } from 'bcryptjs';
import { setHours, isPast } from 'date-fns';

import Model from '../_Bases/model';
import Category from '../category';
import Image from '@core/image';
import { AddressEstablishment } from '@core/address-establishment';

class Establishment extends Model {
  name: string;
  cellphone: string;
  email: string;
  password: string;
  active: boolean;
  openingTime: number;
  closingTime: number;
  freightValue: number;

  image_id!: number;

  public readonly image?: Image;
  public readonly categories?: Category[];
  public readonly address?: AddressEstablishment;

  // Relacionamento de outras tabelas
  /* address: Address;
  image: Image;
  categories: EstablishmentCategory[]; */

  // Relacionamento para outras tabelas
  /* menus: Menu[];
  orders: Order[]; */

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      openingTime: DataTypes.NUMBER,
      closingTime: DataTypes.NUMBER,
      freightValue: DataTypes.NUMBER,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'establismnts' });

    return this;
  }

  static associate({ Category, Image, AddressEstablishment }) {
    this.hasMany(Category, { foreignKey: 'establishment_id', as: 'categories' });
    this.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(AddressEstablishment, { foreignKey: 'address_id', as: 'address_establishment' });
  }

  public setImage(imageId: number): void {
    this.image_id = imageId;
  }

  public getName(): string {
    return this.name;
  }

  public getFreightValue(): number {
    return this.freightValue;
  }


  hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  public isActive(): boolean {
    return this.active;
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }

  public activate(): void {
    this.active = true;
  }

  public updateProfile(name: string, email: string, cellphone: string): void {
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
  }

  public setPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

  public isOpen(): boolean {
    const closedDate = setHours(new Date(), this.closingTime);

    if (isPast(closedDate)) return false;

    return true;
  }
}

export default Establishment;
