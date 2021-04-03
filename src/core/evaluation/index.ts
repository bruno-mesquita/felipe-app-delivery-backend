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

  static start(sequelize: Sequelize) {
    this.init({
      value: DataTypes.NUMBER,
      message: DataTypes.STRING,
    }, { sequelize, tableName: 'evaluations' });

    return this;
  }
}

export default Evaluation;
