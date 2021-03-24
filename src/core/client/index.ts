import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

import EntityBase from '@shared/utils/entity';
import Image from '@core/image';
import Order from '@core/order';
import AddressClient from '@core/address-client';

@Entity('client')
class Client extends EntityBase {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cellphone: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ default: false })
  active: boolean;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @OneToMany(() => AddressClient, (adresses) => adresses.client_id)
  adresses: AddressClient[];

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

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

  public updateProfile(name: string, email: string, phone: string): void {
    this.name = name;
    this.email = email;
    this.cellphone = phone;
  }

  public setPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

  public setImage(image: Image) {
    this.image = image;
  }
}

export default Client;
