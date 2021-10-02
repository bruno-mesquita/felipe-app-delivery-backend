import { DataTypes, Sequelize } from 'sequelize';

import UserBase from '../_Bases/user';

class Admin extends UserBase {
  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
    }, { sequelize, tableName: 'admin' });

    return this;
  }
}

export default Admin;
