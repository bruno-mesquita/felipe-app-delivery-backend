import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

import EntityBase from '@shared/utils/entity';
import { Image } from '@modules/image';
import { Order } from '@modules/order';

@Entity({ name: 'users' })
class User extends EntityBase {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  test1: string;

  @Column()
  cellphone: string;

  @Column()
  cpf: string;

  @Column()
  active: boolean;

  @OneToOne(() => Image)
  @JoinColumn()
  image_id: Image;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];

  @BeforeInsert()
  private hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  public isActive(): boolean {
    return this.active;
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }
}

export default User;
