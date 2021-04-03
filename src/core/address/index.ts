/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
*/

import { Model, DataTypes, Sequelize } from 'sequelize';

export interface AddressAttributes {
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  city: string;
}

class Address extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      cep: DataTypes.STRING,
      city: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'adresses' });

    return this;
  }
}

export default Address;
