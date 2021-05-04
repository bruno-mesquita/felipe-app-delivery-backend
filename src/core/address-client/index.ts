import { DataTypes, Sequelize, HasManyGetAssociationsMixin } from 'sequelize';

import Order from '@core/order';
import AddressModel from '../_Bases/address';

class AddressClient extends AddressModel {
  nickname: string;
  client_id!: number;
  active: boolean;

  public getOrders!: HasManyGetAssociationsMixin<Order>;

  static start(sequelize: Sequelize) {
    this.init({
      nickname: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      cep: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'address_client' });

    return this;
  }

  static associate({ City, Order, Client }) {
    this.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
    this.hasMany(Order, { foreignKey: 'address_id', as: 'orders', sourceKey: 'id' });
    this.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
  }

  public getNickname(): string {
    return this.nickname;
  }

  public setNickname(nickname: string): void {
    this.nickname = nickname;
  }
}

export default AddressClient;
