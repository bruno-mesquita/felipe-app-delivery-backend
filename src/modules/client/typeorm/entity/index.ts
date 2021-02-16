import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

import EntityBase from '@shared/utils/entity';
import { Image } from '@modules/image';
import { Order } from '@modules/order';

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

  @OneToOne(() => Image, (image) => image.client)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @OneToMany(() => Order, (order) => order.client_id)
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
}

export default Client;
