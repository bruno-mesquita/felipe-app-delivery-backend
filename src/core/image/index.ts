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
    }, { sequelize, tableName: 'image' });

    return this;
  }

  public setName(name: string): void {
    this.set('name', name);
  }

  public setEncoded(encoded: string): void {
    this.set('encoded', encoded);
  }

  public getName(): string {
    return this.get('name');
  }
  public getEncoded(): string {
    return this.get('encoded');
  }
}

export default Image;
