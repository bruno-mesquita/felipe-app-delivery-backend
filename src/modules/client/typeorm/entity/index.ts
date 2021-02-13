<<<<<<< HEAD
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';

import { hashSync, compareSync } from 'bcryptjs';

import EntityBase from '@shared/utils/entity';

import { Image } from '@modules/image';

import { Order } from '@modules/order';

@Entity({ name: 'client' })
class Client extends EntityBase {
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

  @Column({ default: false })
  active: boolean;

  @OneToOne(() => Image)
  @JoinColumn()
  image_id: Image;

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
}

export default Client;
=======
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

import EntityBase from '@shared/utils/entity';
import { Image } from '@modules/image';
import { Order } from '@modules/order';

@Entity({ name: 'client' })
class Client extends EntityBase {
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

  @Column({ default: false })
  active: boolean;

  @OneToOne(() => Image)
  @JoinColumn()
  image_id: Image;

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
}

export default Client;
>>>>>>> b4cd43072b87da209811726a88f431d16ac04351
