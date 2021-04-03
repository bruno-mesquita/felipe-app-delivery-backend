/**

 * @fileoverview Criação da entidade State

 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';

class State extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active:  DataTypes.BOOLEAN,
    }, { sequelize });
  }
}

export default State;
