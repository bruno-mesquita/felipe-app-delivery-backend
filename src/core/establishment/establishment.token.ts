/**
 * @fileoverview Criação da entidade Establishment Token
 *
 * @author Jonatas Rosa Moura
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';

export class EstablishmentToken extends Model {
  static start(sequelize: Sequelize): void {
    this.init({
      token: DataTypes.STRING,
      establishmentId: DataTypes.UUIDV4,
    }, { sequelize })
  }
}
