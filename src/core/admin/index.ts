/**
 * @fileoverview Entidade Admin
 *
 * @author Bruno Mesquita
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';

class Admin extends Model {
  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
    }, { sequelize });
  }
}

export default Admin;
