import { Model, DataTypes, Sequelize } from 'sequelize';

export interface AddressAttributes {
  nickname: string;
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  /* city: string; */
}

class AddressClient extends Model {
  nickname: string;
  street: string;
  number: string;
  neighborhood: string;
  cep: string;

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
