import {
  DataTypes,
  Sequelize,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';

import Product from '@core/product';
import Model from '../_Bases/model';

export interface TModelAttributes {
  id: number;
  name: string;
  establishmentId: number;
  active: boolean;
  priority: number;
}

export type TCreationAttributes = Omit<TModelAttributes, 'id'>;

class Menu extends Model<any, TCreationAttributes> {
  declare name: string;

  declare establishmentId: number;

  declare active: boolean;

  declare priority: number;

  public readonly products?: Product[];

  public createProduct: HasManyCreateAssociationMixin<Product>;

  public removeProduct: HasManyRemoveAssociationMixin<Product, number>;

  public getProducts: HasManyGetAssociationsMixin<Product>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        priority: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'menu', paranoid: true }
    );

    return this;
  }

  static associate(models: any): void {
    this.belongsTo(models.Establishment, {
      foreignKey: 'establishmentId',
      as: 'establishments',
    });
    this.hasMany(models.Product, {
      foreignKey: 'menu_id',
      as: 'products',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  }
}

export default Menu;
