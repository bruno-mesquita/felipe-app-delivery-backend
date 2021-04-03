/*
 * @fileoverview entidade de produtos
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';

class ItemOrder extends Model {
  quantity: number;
  total: number;

  static start(sequelize: Sequelize): void {
    this.init({
      quantity: DataTypes.NUMBER,
      total: DataTypes.NUMBER,
      productId: DataTypes.UUIDV4,
      orderId: DataTypes.UUIDV4,
    }, { sequelize, tableName: 'item_order' });
  }
}

export default ItemOrder;
