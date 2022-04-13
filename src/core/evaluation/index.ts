/**
 * @fileoverview entidade de Avaliação
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Evaluation extends Model {
  declare value: number;

  declare message: string;

  static start(sequelize: Sequelize) {
    this.init(
      {
        value: DataTypes.NUMBER,
        message: DataTypes.STRING,
      },
      { sequelize, tableName: 'evaluation' }
    );

    return this;
  }
}

export default Evaluation;
