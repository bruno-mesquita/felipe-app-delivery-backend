/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';

class Menu extends Model {
  name: string;

  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.NUMBER,
      establishment: DataTypes.UUIDV4,
    }, { sequelize });
  }

  public getName(): string {
    return this.name;
  }
}

export default Menu;
