/**
 * @fileoverview Criação da entidade City
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';


class City extends Model {
  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      state: DataTypes.UUIDV4,
    }, { sequelize });
  }
}

export default City;
