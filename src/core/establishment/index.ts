import { Model, DataTypes, Sequelize } from 'sequelize';
import { compareSync, hashSync } from 'bcryptjs';
import { setHours, isPast } from 'date-fns';

import Address from '@core/address';
import Image from '@core/image';
import EstablishmentCategory from '@core/establishment-category';
import Menu from '@core/menu';
import Order from '@core/order';

class Establishment extends Model {
  name: string;
  cellphone: string;
  email: string;
  password: string;
  active: boolean;
  openingTime: number;
  closingTime: number;
  freightValue: number;

  // Relacionamento de outras tabelas
  address: Address;
  image: Image;
  categories: EstablishmentCategory[];

  // Relacionamento para outras tabelas
  menus: Menu[];
  orders: Order[];

  static start(sequelize: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      openingTime: DataTypes.NUMBER,
      closingTime: DataTypes.NUMBER,
      freightValue: DataTypes.NUMBER,
    }, { sequelize });
  }

  public getName(): string {
    return this.name;
  }

  public getFreightValue(): number {
    return this.freightValue;
  }

  public getImage(): Image {
    return this.image;
  }

  hashPassword(): void {
    this.password = hashSync(this.password, 8);
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

  public updateProfile(name: string, email: string, cellphone: string): void {
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
  }

  public setPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

  public isOpen(): boolean {
    const closedDate = setHours(new Date(), this.closingTime);

    if (isPast(closedDate)) return false;

    return true;
  }

  public setImage(image: Image) {
    this.image = image;
  }

  public getMenus(): Menu[] {
    return this.menus;
  }

  public getAddress(): Address {
    return this.address;
  }
}

export default Establishment;
