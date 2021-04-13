import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';
class ClientActivationCode extends Model {
  attempts: number;
  code: string;

  static start(sequelize: Sequelize) {
    this.init({
      attempts: DataTypes.NUMBER,
      code: DataTypes.STRING,
    }, { sequelize, tableName: 'client_activation_code' });

    return this;
  }

  static associate({ Client }) {
    this.belongsTo(Client, { foreignKey: 'client_id' });
  }

  public generateCode(): string {
    this.attempts += 1;

    const code = `code${this.attempts}`;

    this.code = code;

    return code;
  }

  public getCode(): string {
    return this.code;
  }

  public compareCode(code: string): boolean {
    return this.code === code;
  }
}

export default ClientActivationCode;
