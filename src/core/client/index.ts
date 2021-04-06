import { Model, DataTypes, Sequelize } from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';

import UserBase from '../_Bases/user';

class Client extends UserBase {
  cpf: string;
/*
  adresses: AddressClient[];
  orders: Order[]; */

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


  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }
}

export default Client;
