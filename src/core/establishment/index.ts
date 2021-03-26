/**

 * @fileoverview Criação da entidade Store

 *

 * @author Bruno Mesquita

 * @author Jonatas Rosa Moura

 */

import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, Tree } from 'typeorm';

import { compareSync, hashSync } from 'bcryptjs';

import { setHours, isPast } from 'date-fns';

import EntityBase from '@shared/utils/entity';

import Address from '@core/address';

import Image from '@core/image';

import EstablishmentCategory from '@core/establishment-category';

import Menu from '@core/menu';

import Order from '@core/order';

@Entity('establishment')
class Establishment extends EntityBase {
  @Column()
  name: string;

  @Column({ unique: true })
  cellphone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column()
  openingTime: number;

  @Column()
  closingTime: number;

  // Relacionamento de outras tabelas

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @OneToMany(() => EstablishmentCategory, (categories) => categories.establishment)
  categories: EstablishmentCategory[];

  // Relacionamento para outras tabelas

  @OneToMany(() => Menu, (menu) => menu.establishment)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.establishment)
  orders: Order[];

  // funcionalidaddes

  @BeforeInsert()
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
}

export default Establishment;
