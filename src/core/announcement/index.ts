import { BelongsTo, BelongsToGetAssociationMixin, DataTypes, Sequelize } from 'sequelize';
import Model from '@core/_Bases/model';
import Image from '@core/image';

export class Announcement extends Model {
  name: string;
  active: boolean;
  image_id!: number;

  public readonly photo?: Image;

  public static Photo: BelongsTo<Announcement, Image>;

  public getPhoto!: BelongsToGetAssociationMixin<Image>;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'announcement' });

    return this;
  };

  static associate({ Image }) {
    Announcement.Photo = this.belongsTo(Image, { foreignKey: 'image_id', as: 'photo' });
  };

  public getName(): string {
    return this.name;
  }

  public updateAnnouncement(name: string, active: boolean): void {
    this.name = name;
    this.active = active;
  }

  public isActive(): boolean {
    return this.active;
  }
};
