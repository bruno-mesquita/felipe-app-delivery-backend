import { BelongsTo, BelongsToGetAssociationMixin, DataTypes, Sequelize } from 'sequelize';
import Model from '@core/_Bases/model';
import Image from '@core/image';

export class Announcement extends Model {
  declare name: string;

  declare active: boolean;

  declare image_id: number;

  declare photo?: Image | String;

  declare static Photo: BelongsTo<Announcement, Image>;

  declare getPhoto: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'announcement' }
    );

    return this;
  }

  static associate(models) {
    Announcement.Photo = this.belongsTo(models.Image, {
      foreignKey: 'image_id',
      as: 'photo',
    });
  }
}
