/* import { Model, DataTypes, Sequelize } from 'sequelize';

export interface AddressAttributes {
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  city: string;
}

class Address extends Model<AddressAttributes, Partial<AddressAttributes>> {
  static start(sequelize: Sequelize) {
    this.init({
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      cep: DataTypes.STRING,
    }, { sequelize, tableName: 'adresses' });

    return this;
  }
}

export default Address;
 */
