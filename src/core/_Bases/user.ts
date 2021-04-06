import Model from './model';

abstract class User extends Model {
  name: string;
  email: string;
  password: string;
  cellphone: string;
  active: string;
}

export default User
