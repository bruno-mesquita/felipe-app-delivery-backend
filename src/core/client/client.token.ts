import { Model, DataTypes, Sequelize } from 'sequelize';

class ClientToken extends Model {
  static start(sequelize: Sequelize): void {
    this.init({
      token: DataTypes.STRING,
      clientId: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'client_token' });
  }
}

export { ClientToken };
