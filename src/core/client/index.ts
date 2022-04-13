import {
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  HasMany,
} from 'sequelize';

import Image from '@core/image';
import AddressClient from '@core/address-client';
import Order from '@core/order';
import UserBase from '../_Bases/user';

class Client extends UserBase {
  declare cpf: string;

  declare avatar_id: number;

  declare avatar?: Image;

  declare orders?: Order[];

  declare adresses?: AddressClient[];

  static Addresses: HasMany<Client>;

  declare createOrder: HasManyCreateAssociationMixin<Order>;

  declare getOrders: HasManyGetAssociationsMixin<Order>;

  declare createAdress: HasManyCreateAssociationMixin<AddressClient>;

  declare getAdresses: HasManyGetAssociationsMixin<AddressClient>;

  declare getAvatar: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        cpf: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'client', paranoid: true }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Image, { foreignKey: 'avatar_id', as: 'avatar' });
    this.Addresses = this.hasMany(models.AddressClient, {
      foreignKey: 'client_id',
      as: 'addresses',
      sourceKey: 'id',
    });
    this.hasMany(models.Order, {
      foreignKey: 'client_id',
      as: 'orders',
      sourceKey: 'id',
    });
  }
}

export default Client;
