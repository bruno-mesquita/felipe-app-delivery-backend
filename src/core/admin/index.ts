import { Model, DataTypes, Sequelize } from 'sequelize';

class Admin extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
    }, { sequelize, tableName: 'admins' });

    return this;
  }
}

export default Admin;
