import {
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsTo
} from 'sequelize';

import City from '@core/city';
import Image from '@core/image';

import { EstablishmentOwner } from '../establishment-owner';
import UserBase from '../_Bases/user';

class CityManager extends UserBase {
  city_of_action_id: number;
  avatar_id: number;

  public readonly avatar?: Image;
  public readonly establishments?: EstablishmentOwner[];
  public readonly cityOfAction?: City;

  public createEstablishment!: HasManyCreateAssociationMixin<EstablishmentOwner>;
  public getEstablishments!: HasManyGetAssociationsMixin<EstablishmentOwner>;

  public static Avatar: BelongsTo<CityManager, Image>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'city-manager', paranoid: true });

    return this;
  }

  static associate({ EstablishmentOwner, City, Image }) {
    CityManager.Avatar = this.belongsTo(Image, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(City, { foreignKey: 'city_of_action_id', as: 'cityOfAction' });
    this.hasMany(EstablishmentOwner, { foreignKey: 'created_by_id', as: 'establishments', sourceKey: 'id' })
  }

}

export default CityManager;
