import { compareSync, hashSync } from 'bcryptjs';

import Model from './model';

abstract class User extends Model {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  active: boolean;

  public setName(name: string): void {
    this.set('name', name);
  }

  public setEmail(email: string): void {
    this.set('email',email);
  }

  public getEmail(): string {
    return this.get('email');
  }

  public setCellphone(cellphone: string): void {
    this.set('cellphone', cellphone);
  }

  public getCellphone(): string {
    return this.get('cellphone');
  }

  public getActive(): boolean {
    return this.get('active');
  }

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

export default User
