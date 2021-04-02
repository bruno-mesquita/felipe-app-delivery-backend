/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

 import { Model, DataTypes, Sequelize } from 'sequelize';

class Image extends Model {
  name: string;
  encoded: string;

  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      encoded: DataTypes.STRING,
    }, { sequelize });
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setEncoded(encoded: string): void {
    this.encoded = encoded;
  }

  public getEncoded(): string {
    return this.encoded;
  }
}

export default Image;
