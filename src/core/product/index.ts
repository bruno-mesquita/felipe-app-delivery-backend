/**
 * @fileoverview Criação da entidade Produto
 */

import { DataTypes, Sequelize, BelongsToGetAssociationMixin } from 'sequelize';

import Image from '@core/image';
import Model from '../_Bases/model';

class Product extends Model {
  name: string;
  price: number;
  description: string;
  menu_id!: number;
  image_id!: number;

  public readonly photo?: Image;

  public getPhoto!: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      description: DataTypes.STRING,
    }, { sequelize, tableName: 'products' });

    return this;
  }

  static associate({ Image, Menu }): void {
    this.belongsTo(Image, { foreignKey: 'image_id', as: 'photo' })
    this.belongsTo(Menu, { foreignKey: 'menu_id', as: 'menu' })
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getDescription(): string {
    return this.description;
  }

  public updateProduct(name: string, price: number, description: string, menuId: number): void {
    this.name = name;
    this.price = price;
    this.description = description;
    this.menu_id = menuId;
  }

  public calcTotal(amount: number): number {
    return this.price * amount;
  }
}

export default Product;
