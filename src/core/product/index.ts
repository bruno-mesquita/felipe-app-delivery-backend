import { DataTypes, Sequelize, BelongsToGetAssociationMixin, BelongsTo } from 'sequelize';

import Image from '@core/image';
import Model from '../_Bases/model';

export const UNIT = {
  UN: 'Un',
  GR: 'gr',
  KG: 'Kg',
};

class Product extends Model {
  declare name: string;

  declare price: number;

  declare description: string;

  declare active: boolean;

  declare menu_id: number;

  declare image_id: number;

  declare unitType: string;

  declare unit: number;

  declare photo?: Image;

  static Photo: BelongsTo<Product, Image>;

  declare getPhoto: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        unit: DataTypes.NUMBER,
        unitType: DataTypes.STRING,
      },
      { sequelize, tableName: 'product', paranoid: true }
    );

    return this;
  }

  static associate(models): void {
    Product.Photo = this.belongsTo(models.Image, {
      foreignKey: 'image_id',
      as: 'photo',
    });
    this.belongsTo(models.Menu, { foreignKey: 'menu_id', as: 'menu' });
  }

  public calcTotal(amount: number): number {
    return this.price * amount;
  }
}

export default Product;
