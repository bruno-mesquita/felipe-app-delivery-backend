import { compareSync, hashSync } from 'bcryptjs';

import Model from './model';

abstract class User extends Model {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  active: boolean;

  public getActive(): boolean {
    return this.active;
  }

  public activate(): void {
    this.active = true;
  }

  public deactivate(): void {
    this.active = false;
  }

  public hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  public comparePassword(comparePassword: string): boolean {
    return compareSync(comparePassword, this.password);
  }

  public setPassword(password: string): void {
    this.password = hashSync(password, 8);
  }
}

export default User
