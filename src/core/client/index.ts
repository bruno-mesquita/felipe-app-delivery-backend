import { Model, DataTypes, Sequelize } from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';
import Image from '@core/image';

class Client extends Model {
  id: string;
  name: string;
  email: string;
  password: string;
  cellphone: string;
  cpf: string;
  active: boolean;
  avatar: Image;
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
