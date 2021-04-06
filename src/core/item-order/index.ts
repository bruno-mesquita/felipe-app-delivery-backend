import {  DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

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
