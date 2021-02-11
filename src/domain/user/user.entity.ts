import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

import EntityBase from '@shared/entity';
import { Image } from '@domain/image';
import { Order } from '@domain/order';

@Entity({ name: 'users' })
class User extends EntityBase {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cellphone: string;

  @Column()
  cpf: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image_id: Image;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];

  @BeforeInsert()
  private hashPassword(): void {
    this.password = hashSync(this.password);
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }
}

export default User;
