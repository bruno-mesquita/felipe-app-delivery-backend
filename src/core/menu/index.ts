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

  public readonly products?: Product[];

  public createProduct: HasManyCreateAssociationMixin<Product>;
  public removeProduct: HasManyRemoveAssociationMixin<Product, number>;
  public getProducts: HasManyGetAssociationsMixin<Product>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.NUMBER,
    }, { sequelize, tableName: 'menus' });

    return this;
  }

  static associate({ Establishment, Product }): void {
    this.belongsTo(Establishment, { foreignKey: 'establishment_id', as: 'establishments' });
    this.hasMany(Product, { foreignKey: 'menu_id', as: 'products', sourceKey: 'id' });
  }

  public setName(name: string): void {
    this.name = name;
  }
}

export default Menu;
