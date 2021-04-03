/**
 * @fileoverview Casos de testes para a criação do cliente
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';

class AddressClient extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      nickname: DataTypes.STRING,
      client_id: DataTypes.UUIDV4,
      address_id: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'address_client' });
  }
}

export default AddressClient;
