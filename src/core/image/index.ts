/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

 import { DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class Image extends Model {
  name: string;
  encoded: string;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      encoded: DataTypes.STRING,
    }, { sequelize, tableName: 'images' });

    return this;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEncoded(encoded: string): void {
    this.encoded = encoded;
  }

  public getName(): string {
    return this.name;
  }
  public getEncoded(): string {
    return this.encoded;
  }
}

export default Image;
