import {
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';

import Image from '@core/image';
import AddressEstablishment from '@core/address-establishment';
import Order from '@core/order';
import Menu from '@core/menu';
import Freight from '../Freight';
import Model from '../_Bases/model';

class Establishment extends Model {
  declare name: string;

  declare cellphone: string;

  declare active: boolean;

  declare openingTime: number;

  declare closingTime: number;

  declare freightValue: number;

  declare evaluation: number;

  declare image_id: number;

  declare address_id: number;

  declare image?: Image;

  declare address?: AddressEstablishment;

  declare orders?: Order[];

  declare freights?: Freight[];

  declare menus?: Menu[];

  declare getOrders: HasManyGetAssociationsMixin<Order>;

  declare addFreight: HasManyAddAssociationMixin<Freight, number>;

  declare addFreights: HasManyAddAssociationsMixin<Freight, number>;

  declare getFreights: HasManyGetAssociationsMixin<Freight>;

  declare createFreight: HasManyCreateAssociationMixin<Freight, 'establishmentId'>;

  declare getMenus: HasManyGetAssociationsMixin<Menu>;

  declare setImage: BelongsToSetAssociationMixin<Image, string>;

  declare getAddress: BelongsToGetAssociationMixin<AddressEstablishment>;

  declare static associations: {
    photo: Association<Establishment, Image>;
    freights: Association<Establishment, Freight>;
    address: Association<Establishment, AddressEstablishment>;
  };

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

  static associate(models) {
    this.hasMany(models.EstablishmentCategory, {
      foreignKey: 'establishment_id',
      as: 'categories',
    });
    this.belongsTo(models.Image, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(models.AddressEstablishment, {
      foreignKey: 'address_id',
      as: 'address',
    });
    this.hasMany(models.Order, {
      foreignKey: 'establishment_id',
      as: 'orders',
      sourceKey: 'id',
    });
    this.hasMany(models.Menu, {
      foreignKey: 'establishment_id',
      as: 'menus',
      sourceKey: 'id',
    });

    this.hasMany(models.Freight, {
      foreignKey: 'establishmentId',
      as: 'freights',
      sourceKey: 'id',
    });
  }

  public activate(): void {
    this.set('active', true);
  }

  public deactivate(): void {
    this.set('active', true);
  }
}

export default Establishment;
