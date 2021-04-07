import {  DataTypes, Sequelize } from 'sequelize';

import Model from '../_Bases/model';

class ItemOrder extends Model {
  quantity: number;
  total: number;
  product_id: string;
  order_id: string;

  static start(sequelize: Sequelize) {
    this.init({
      quantity: DataTypes.NUMBER,
      total: DataTypes.NUMBER,
    }, { sequelize, tableName: 'item_order' });

    return this;
  }

  static associate({ Product, Order }): void {
    this.belongsTo(Product, { foreignKey: 'product_id', as: 'product' })
    this.belongsTo(Order, { foreignKey: 'order_id', as: 'order' })
  }
}

export default ItemOrder;
