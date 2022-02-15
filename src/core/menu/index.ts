/**
 * @fileoverview entidade de produtos
 */

import {
  DataTypes,
  Sequelize,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyGetAssociationsMixin
} from 'sequelize';

import Product from '@core/product';
import Model from '../_Bases/model';

class Menu extends Model {
  name: string;
  establishment_id!: number;
  active: boolean;

  public readonly products?: Product[];

  public createProduct: HasManyCreateAssociationMixin<Product>;
  public removeProduct: HasManyRemoveAssociationMixin<Product, number>;
  public getProducts: HasManyGetAssociationsMixin<Product>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.NUMBER,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'menu', paranoid: true });

    return this;
  }

  static associate({ Establishment, Product }): void {
    this.belongsTo(Establishment, { foreignKey: 'establishment_id', as: 'establishments' });
    this.hasMany(Product, { foreignKey: 'menu_id', as: 'products', sourceKey: 'id', onDelete: 'cascade' });
  }

  public setName(name: string): void {
    this.set('name', name);
  }
}

export default Menu;
