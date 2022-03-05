import { DataTypes, Sequelize, HasManyGetAssociationsMixin } from 'sequelize';

import Order from '@core/order';
import AddressModel from '../_Bases/address';

class AddressClient extends AddressModel {
  declare nickname: string;

  declare client_id: number;

  declare active: boolean;

  declare getOrders: HasManyGetAssociationsMixin<Order>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        nickname: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        cep: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'address_client', paranoid: true }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
    this.hasMany(models.Order, {
      foreignKey: 'address_id',
      as: 'orders',
      sourceKey: 'id',
    });
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
  }
}

export default AddressClient;
