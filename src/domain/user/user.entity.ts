<<<<<<< HEAD
import { Entity, Column } from 'typeorm';

import EntityBase from '@shared/entity';

@Entity({ name: 'user' })
class User extends EntityBase {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar' })
  cellphone!: string;

  @Column({ type: 'varchar' })
  cpf!: string;
}

export default User;
=======
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
>>>>>>> dbc6b9ad324b72d2fcda5058db44c15b67a22063
