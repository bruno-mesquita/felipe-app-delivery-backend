/**

 * @fileoverview Entidade Admin

 *

 * @author Bruno Mesquita

 */

import { Entity, Column, BeforeInsert } from 'typeorm';

import { hashSync, compareSync } from 'bcryptjs';

import BaseEntity from '@shared/utils/entity';

@Entity('admin')
class Admin extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @BeforeInsert()
  public hashPassword(): void {
    this.password = hashSync(this.password);
  }

  public comparePassword(pwd: string): boolean {
    return compareSync(pwd, this.password);
  }
}

export default Admin;
