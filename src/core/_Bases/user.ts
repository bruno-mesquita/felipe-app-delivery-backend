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
}

export default User
