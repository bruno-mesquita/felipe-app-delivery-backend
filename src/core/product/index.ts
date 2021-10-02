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
    }, { sequelize, tableName: 'product', paranoid: true });

    return this;
  }

  static associate({ Image, Menu }): void {
    Product.Photo = this.belongsTo(Image, { foreignKey: 'image_id', as: 'photo' })
    this.belongsTo(Menu, { foreignKey: 'menu_id', as: 'menu' })
  }

  public getName(): string {
    return this.get('name');
  }

  public getPrice(): number {
    return this.get('price');
  }

  public getDescription(): string {
    return this.get('description');
  }

  public updateProduct(name: string, price: number, description: string, menuId: number, active: boolean): void {
    this.set('name', name);
    this.set('price', price);
    this.set('description', description);
    this.set('active', active);
    this.set('menu_id', menuId);
  }

  public isActive(): boolean {
    return this.get('active');
  }

  public calcTotal(amount: number): number {
    return this.get('price') * amount;
  }
}

export default Product;
