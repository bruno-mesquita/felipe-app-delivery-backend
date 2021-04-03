/**
 * @fileoverview Criação da entidade Produto
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';


class Product extends Model {
  name: string;
  price: number;
  description: string;
/*   image: Image;
  menu: Menu; */

  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
      description: DataTypes.STRING,
      image: DataTypes.UUIDV4,
      menu: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'products' });
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
