import {
  DataTypes,
  Sequelize,
  BelongsToGetAssociationMixin,
  OrderItem,
} from 'sequelize';

import Order from '@core/order';
import Product from '@core/product';
import Model from '../_Bases/model';

class ItemOrder extends Model {
  quantity: number;

  total: number;

  product_id!: number;

  order_id!: number;

  public readonly product?: Product;

  public readonly order?: Order;

  public getProduct!: BelongsToGetAssociationMixin<Product>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        quantity: DataTypes.NUMBER,
        total: DataTypes.NUMBER,
      },
      { sequelize, tableName: 'item_order' }
    );

    return this;
  }

  static associate({ Product, Order }): void {
    this.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
  }
}

export default ItemOrder;
