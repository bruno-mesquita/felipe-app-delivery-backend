import { Entity, Column } from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

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

  private hashPassword(): void {
    this.password = hashSync(this.password);
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }
}

export default User;
