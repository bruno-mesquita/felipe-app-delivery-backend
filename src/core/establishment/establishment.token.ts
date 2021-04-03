import { Model, DataTypes, Sequelize } from 'sequelize';

export class EstablishmentToken extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      token: DataTypes.STRING,
      establishmentId: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'establismnt_token' })

    return this;
  }
}
