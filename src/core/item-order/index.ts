/*
 * @fileoverview entidade de produtos
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Model, DataTypes, Sequelize } from 'sequelize';

class ItemOrder extends Model {
  quantity: number;
  total: number;

  static start(sequelize: Sequelize) {
    this.init({
      quantity: DataTypes.NUMBER,
      total: DataTypes.NUMBER,
      productId: DataTypes.STRING,
      orderId: DataTypes.STRING,
    }, { sequelize, tableName: 'item_order' });

    return this;
  }
}

export default ItemOrder;
