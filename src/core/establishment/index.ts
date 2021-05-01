import { DataTypes, Sequelize, HasManyGetAssociationsMixin, BelongsToSetAssociationMixin } from 'sequelize';
import { hashSync } from 'bcryptjs';
import { setHours, isPast } from 'date-fns';

import UserModel from '../_Bases/user';
import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import Order from '@core/order';
import Menu from '@core/menu';

class Establishment extends UserModel {
  openingTime: number;
  closingTime: number;
  freightValue: number;
  evaluation: number;
  image_id!: number;
  address_id!: number;

  public readonly image?: Image;
  public readonly address?: AddressEstablishment;
  public readonly orders?: Order[];
  public readonly menus?: Menu[];

  public getOrders!: HasManyGetAssociationsMixin<Order>;
  public getMenus!: HasManyGetAssociationsMixin<Menu>;
  public setImage!: BelongsToSetAssociationMixin<Image, string>;


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

    return this;
  }

  static associate({ Image, AddressEstablishment, EstablishmentCategory, Order, Menu }) {
    this.hasMany(EstablishmentCategory, { foreignKey: 'establishment_id', as: 'establishments' });
    this.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(AddressEstablishment, { foreignKey: 'address_id', as: 'address' });
    this.hasMany(Order, { foreignKey: 'establishment_id', as: 'orders', sourceKey: 'id' })
    this.hasMany(Menu, { foreignKey: 'establishment_id', as: 'menus', sourceKey: 'id' })
  }

  public setImageId(imageId: number): void {
    this.image_id = imageId;
  }

  public getFreightValue(): number {
    return this.freightValue;
  }

  public updateProfile(
    name: string, email: string, cellphone: string, openingTime: number, closingTime: number, freightValue: number, active: boolean
    ): void {
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.freightValue = freightValue,
    this.openingTime = openingTime,
    this.closingTime = closingTime,
    this.active = active
  }

  public setPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

  public isOpen(): boolean {
    const closedDate = setHours(new Date(), this.closingTime);

    if (isPast(closedDate)) return false;

    return true;
  }

  public isActive(): boolean {
    return this.active;
  }
}

export default Establishment;
