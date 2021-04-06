/**
 * @fileoverview entidade de Avaliação
 */

import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

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
