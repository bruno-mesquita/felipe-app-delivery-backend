import { DataTypes, Sequelize, BelongsToGetAssociationMixin } from 'sequelize';

import Order from '@core/order';
import Product from '@core/product';
import Model from '../_Bases/model';

class ItemOrder extends Model {
  declare quantity: number;

  declare total: number;

  declare product_id: number;

  declare order_id: number;

  declare product?: Product;

  declare order?: Order;

  declare getProduct: BelongsToGetAssociationMixin<Product>;

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

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

export default ItemOrder;
