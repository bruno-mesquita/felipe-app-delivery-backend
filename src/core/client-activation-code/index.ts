/**
 * @fileoverview Criação da entidade ClientActivateCode, representa o codigo de ativação da conta do usuário
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';

class ClientActivationCode extends Model {
  static start(sequelize: Sequelize): void {
    this.init({
      attempts: DataTypes.NUMBER,
      code: DataTypes.STRING,
      client: DataTypes.UUIDV4,
    }, { sequelize });
  }


  /* public generateCode(): string {
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
  } */
}

export default ClientActivationCode;
