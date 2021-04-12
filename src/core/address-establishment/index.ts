import { DataTypes, Sequelize } from 'sequelize';
import AddressModel from '../_Bases/address';

class AddressEstablishment extends AddressModel {
  static start(sequelize: Sequelize) {
    this.init({
      street: DataTypes.STRING,
      number: DataTypes.NUMBER,
      neighborhood: DataTypes.STRING,
      cep: DataTypes.STRING,
    }, { sequelize, tableName: 'address_establishment' });

    return this;
  }

  static associate({ City }) {
    this.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
  }
}

export default AddressEstablishment;
