import {
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { hashSync } from 'bcryptjs';

import UserBase from '../_Bases/user';
import Image from '@core/image';
import AddressClient from '@core/address-client';
import Order from '@core/order';

class Client extends UserBase {
  cpf: string;
  avatar_id!: number;

  public readonly avatar?: Image;
  public readonly orders?: Order[];
  public readonly adresses?: AddressClient[];

  public createOrder!: HasManyCreateAssociationMixin<Order>;
  public getOrders!: HasManyGetAssociationsMixin<Order>;

  public createAdress!: HasManyCreateAssociationMixin<AddressClient>;
  public getAdresses!: HasManyGetAssociationsMixin<AddressClient>;

  public getAvatar!: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      cpf: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'clients' });

    this.addHook('beforeSave', (user: Client) => {
      if (user.password) {
        user.password = hashSync(user.password, 8);
      }
    });

    return this;
  }

  static associate({ Image, AddressClient, Order }) {
    this.belongsTo(Image, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(AddressClient, { foreignKey: 'client_id', as: 'adresses', sourceKey: 'id' })
    this.hasMany(Order, { foreignKey: 'client_id', as: 'orders', sourceKey: 'id' })
  }

  public setAvatar(avatarId: number): void {
    this.avatar_id = avatarId;
  }
}

export default Client;
