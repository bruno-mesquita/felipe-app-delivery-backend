/**
 * @fileoverview Criação da entidade Produto
 */

import { DataTypes, Sequelize, BelongsToGetAssociationMixin, BelongsTo } from 'sequelize';

import Image from '@core/image';
import Model from '../_Bases/model';

class Product extends Model {
  name: string;
  price: number;
  description: string;
  active: boolean;
  menu_id!: number;
  image_id!: number;

  public readonly photo?: Image;

  public static Photo: BelongsTo<Product, Image>;

  public getPhoto!: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'products' });

    return this;
  }

  static associate({ Image, Menu }): void {
    Product.Photo = this.belongsTo(Image, { foreignKey: 'image_id', as: 'photo' })
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

  public updateProduct(name: string, price: number, description: string, menuId: number, active: boolean): void {
    this.name = name;
    this.price = price;
    this.description = description;
    this.active = active;
    this.menu_id = menuId;
  }

  public isActive(): boolean {
    return this.active;
  }

  public calcTotal(amount: number): number {
    return this.price * amount;
  }
}

export default Product;
