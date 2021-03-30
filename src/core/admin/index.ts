/**
 * @fileoverview Entidade Admin
 *
 * @author Bruno Mesquita
 */

import { Entity, Column, BeforeInsert } from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

import encrypted from '@shared/typeorm/encrypted';
import BaseEntity from '@shared/utils/entity';

@Entity('admin')
class Admin extends BaseEntity {
  @Column({ transformer: encrypted() })
  name: string;

  @Column({ transformer: encrypted() })
  email: string;

  @Column({ transformer: encrypted() })
  password: string;

  @Column({ transformer: encrypted() })
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
