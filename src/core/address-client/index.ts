import { DataTypes, Sequelize } from 'sequelize';

import AddressModel from '../_Bases/address';

class AddressClient extends AddressModel {
  nickname: string;
  client_id: number;

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

  static associate({ City }) {
    this.belongsTo(City, { foreignKey: 'city_id' });
  }

  public getNickname(): string {
    return this.nickname;
  }

  public setNickname(nickname: string): void {
    this.nickname = nickname;
  }
}

export default AddressClient;
