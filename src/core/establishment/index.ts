import { DataTypes, Sequelize, HasManyGetAssociationsMixin, BelongsToSetAssociationMixin } from 'sequelize';
import { setHours, isPast } from 'date-fns';

import Model from '../_Bases/model';
import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import Order from '@core/order';
import Menu from '@core/menu';

interface UpdateProfile {
  name: string;
  cellphone: string;
  openingTime: number;
  closingTime: number;
  freightValue: number;
  active: boolean;
}

class Establishment extends Model {
  name: string;
  cellphone: string;
  active: boolean;
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
    this.hasMany(EstablishmentCategory, { foreignKey: 'establishment_id', as: 'categories' });
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

  public updateProfile({ name, cellphone, active, closingTime, openingTime, freightValue }: UpdateProfile): void {
    this.name = name;
    this.cellphone = cellphone;
    this.freightValue = freightValue,
    this.openingTime = openingTime,
    this.closingTime = closingTime,
    this.active = active
  }

  public isOpen(): boolean {
    const closedDate = setHours(new Date(), this.closingTime);

    if (isPast(closedDate)) return false;

    return true;
  }

  public setOpeningTime(value: number): void {
    this.openingTime = value;
  }

  public setClosingTime(value: number): void {
    this.closingTime = value;
  }

  public setFreightValue(value: number): void {
    this.freightValue = value;
  }

  public isActive(): boolean {
    return this.active;
  }
}

export default Establishment;
