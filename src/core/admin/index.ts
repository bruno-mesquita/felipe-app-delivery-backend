import { Model, DataTypes, Sequelize } from 'sequelize';

class Admin extends Model {
  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
    }, { sequelize, tableName: 'admins' });
  }
}

export default Admin;
