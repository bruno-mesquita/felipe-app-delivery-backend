import User from '@domain/user';
import { CreateUserDTO } from '@dtos/user.dto';

export interface IUserRepository {
  create(model: CreateUserDTO): Promise<User>;
}
