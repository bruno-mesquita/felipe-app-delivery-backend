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
  menu_id!: string;
  image_id!: string;

  public readonly avatar?: Image;

  public getAvatar!: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      description: DataTypes.STRING,
    }, { sequelize, tableName: 'products' });

    return this;
  }

  static associate({ Image }): void {
    this.belongsTo(Image, { foreignKey: 'image_id', as: 'photo' })
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

  public updateProduct(name: string, price: number, description: string): void {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  public calcTotal(amount: number): number {
    return this.price * amount;
  }
}

export default Product;
