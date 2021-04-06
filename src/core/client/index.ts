import { DataTypes, Sequelize, BelongsToGetAssociationMixin } from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';

import UserBase from '../_Bases/user';
import Image from '@core/image';

class Client extends UserBase {
  cpf: string;
  avatar_id!: number;
/*
  adresses: AddressClient[];
  orders: Order[]; */

  public getAvatar: BelongsToGetAssociationMixin<Image>

  public readonly avatar?: Image;

  static start(sequelize: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      cpf: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize, tableName: 'clients' });

    this.addHook('beforeSave', (user: Client) => {
      if (user.password) {
        user.password = hashSync(user.password, 8);
      }
    });

    return this;
  }

  static associate({ Image }) {
    this.belongsTo(Image, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  public setAvatar(avatarId: number): void {
    this.avatar_id = avatarId;
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }
}

export default Client;
