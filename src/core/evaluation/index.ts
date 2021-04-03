/**
 * @fileoverview entidade de Avaliação
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';

class Evaluation extends Model {
  value: number;
  message: string;

  static start(sequelize: Sequelize): void {
    this.init({
      value: DataTypes.NUMBER,
      message: DataTypes.STRING,
    }, { sequelize, tableName: 'evaluations' });
  }
}

export default Evaluation;
