import { DataTypes, Sequelize } from 'sequelize';

import AddressModel from '../_Bases/address';

class AddressClient extends AddressModel {
  nickname: string;

  static start(sequelize: Sequelize) {
    this.init({
      nickname: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      cep: DataTypes.STRING,
    }, { sequelize, tableName: 'address_client' });

    return this;
  }

  static associate({ Client, City }) {
    this.belongsTo(Client, { foreignKey: 'client_id' });
    this.belongsTo(City, { foreignKey: 'city_id' });
  }
}

export default AddressClient;
