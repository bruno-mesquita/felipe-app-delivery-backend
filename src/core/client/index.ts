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
  cpf: string;

  avatar_id!: number;

  public readonly avatar?: Image;

  public readonly orders?: Order[];

  public readonly adresses?: AddressClient[];

  static Addresses: HasMany<Client>;

  public createOrder!: HasManyCreateAssociationMixin<Order>;

  public getOrders!: HasManyGetAssociationsMixin<Order>;

  public createAdress!: HasManyCreateAssociationMixin<AddressClient>;

  public getAdresses!: HasManyGetAssociationsMixin<AddressClient>;

  public getAvatar!: BelongsToGetAssociationMixin<Image>;

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

  static associate({ Image, AddressClient, Order }) {
    this.belongsTo(Image, { foreignKey: 'avatar_id', as: 'avatar' });
    this.Addresses = this.hasMany(AddressClient, {
      foreignKey: 'client_id',
      as: 'addresses',
      sourceKey: 'id',
    });
    this.hasMany(Order, {
      foreignKey: 'client_id',
      as: 'orders',
      sourceKey: 'id',
    });
  }

  public setAvatar(avatarId: number): void {
    this.set('avatar_id', avatarId);
  }

  public getAvatarId(): number {
    return this.get('avatar_id');
  }
}

export default Client;
