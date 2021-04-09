import { DataTypes, Sequelize } from 'sequelize';
import { hashSync } from 'bcryptjs';
import { setHours, isPast } from 'date-fns';

import UserModel from '../_Bases/user';
import Image from '@core/image';
import { AddressEstablishment } from '@core/address-establishment';

class Establishment extends UserModel {
  openingTime: number;
  closingTime: number;
  freightValue: number;
  evaluation: number;
  image_id!: number;
  address_id!: number;

  public readonly image?: Image;
  public readonly address?: AddressEstablishment;

  // Relacionamento de outras tabelas
  /*
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
      freightValue: DataTypes.DECIMAL,
      evaluation: DataTypes.DECIMAL,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'establishments' });

    this.addHook('beforeSave', (user: Establishment) => {
      if (user.password) user.password = hashSync(user.password, 8);
    });

    return this;
  }

  static associate({ Image, AddressEstablishment, EstablishmentCategory }) {
    this.hasMany(EstablishmentCategory, { foreignKey: 'establishment_id', as: 'establishments' });
    this.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(AddressEstablishment, { foreignKey: 'address_id', as: 'address' });
  }

  public setImageId(imageId: number): void {
    this.image_id = imageId;
  }

  public getFreightValue(): number {
    return this.freightValue;
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
