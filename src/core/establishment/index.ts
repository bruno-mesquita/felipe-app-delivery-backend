import {
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
import { setHours, isPast } from 'date-fns';

import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import Order from '@core/order';
import Menu from '@core/menu';
import Model from '../_Bases/model';

interface UpdateProfile {
  name: string;
  cellphone: string;
  openingTime: number;
  closingTime: number;
  freightValue: number;
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
    this.init(
      {
        name: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        openingTime: DataTypes.NUMBER,
        closingTime: DataTypes.NUMBER,
        freightValue: DataTypes.DECIMAL,
        evaluation: DataTypes.DECIMAL,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'establishment' }
    );

    return this;
  }

  static associate({
    Image,
    AddressEstablishment,
    EstablishmentCategory,
    Order,
    Menu,
  }) {
    this.hasMany(EstablishmentCategory, {
      foreignKey: 'establishment_id',
      as: 'categories',
    });
    this.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(AddressEstablishment, {
      foreignKey: 'address_id',
      as: 'address',
    });
    this.hasMany(Order, {
      foreignKey: 'establishment_id',
      as: 'orders',
      sourceKey: 'id',
    });
    this.hasMany(Menu, {
      foreignKey: 'establishment_id',
      as: 'menus',
      sourceKey: 'id',
    });
  }

  public setImageId(imageId: number): void {
    this.image_id = imageId;
  }

  public getFreightValue(): number {
    return this.get('freightValue');
  }

  public updateProfile({
    name,
    cellphone,
    closingTime,
    openingTime,
    freightValue,
  }: UpdateProfile): void {
    this.set('name', name);
    this.set('cellphone', cellphone);
    this.set('freightValue', freightValue);
    this.set('openingTime', openingTime);
    this.set('closingTime', closingTime);
  }

  public isOpen(): boolean {
    const closedDate = setHours(new Date(), this.get('closingTime'));

    if (isPast(closedDate)) return false;

    return true;
  }

  public setOpeningTime(openingTime: number): void {
    this.set('openingTime', openingTime);
  }

  public setClosingTime(closingTime: number): void {
    this.set('closingTime', closingTime);
  }

  public setFreightValue(freightValue: number): void {
    this.set('freightValue', freightValue);
  }

  public isActive(): boolean {
    return this.get('active');
  }

  public getAddressId(): number {
    return this.get('address_id');
  }

  public activate(): void {
    this.set('active', true);
  }

  public deactivate(): void {
    this.set('active', true);
  }
}

export default Establishment;
