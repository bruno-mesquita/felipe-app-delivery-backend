import { Model, DataTypes, Sequelize } from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';

class Client extends Model {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  cpf: string;
  active: boolean;
/*   image: Image;
  adresses: AddressClient[];
  orders: Order[]; */

  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      cpf: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, { sequelize });
  }

  hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  public getCpf(): string {
    return this.cpf;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCellphone(): string {
    return this.cellphone;
  }

  public isActive(): boolean {
    return this.active;
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }

  public activate(): void {
    this.active = true;
  }

  public updateProfile(name: string, email: string, phone: string): void {
    this.name = name;
    this.email = email;
    this.cellphone = phone;
  }

  public setPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

 /*  public setImage(image: Image) {
    this.image = image;
  }

  public getImage(): Image {
    return this.image;
  } */
}

export default Client;
