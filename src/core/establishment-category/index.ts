/**
 * @fileoverview Criação da entidade Store Category
 *
 * @author Jonatas Rosa Moura
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';

class EstablishmentCategory extends Model {
  static start(sequelize: Sequelize): void {
    this.init({
      category: DataTypes.UUIDV4,
      establishment: DataTypes.UUIDV4,
    }, { sequelize });
  }
}

export default EstablishmentCategory;
