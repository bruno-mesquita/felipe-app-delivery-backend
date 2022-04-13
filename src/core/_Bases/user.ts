import { compareSync, hashSync } from 'bcryptjs';

import Model from './model';

abstract class User extends Model {
  declare name: string;

  declare email: string;

  declare password: string;

  declare cellphone: string;

  declare active: boolean;

  public activate(): void {
    this.set('active', true);
  }

  public deactivate(): void {
    this.set('active', true);
  }

  public hashPassword(): void {
    this.set('password', hashSync(this.get('password'), 8));
  }

  public comparePassword(comparePassword: string): boolean {
    try {
      return compareSync(comparePassword, this.get('password'));
    } catch (err) {
      return false;
    }
  }

  public setPassword(password: string): void {
    this.set('password', password);
  }
}

export default User;
