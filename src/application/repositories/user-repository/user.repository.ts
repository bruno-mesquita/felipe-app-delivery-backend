import { getRepository, Repository } from 'typeorm';

import User from '@domain/user';
import { CreateUserDTO } from '@dtos/user.dto';
import { IUserRepository } from './iuser.repository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(model: CreateUserDTO): Promise<User> {
    const user = this.repository.create(model);

    return this.repository.save(user);
  }
}

export default UserRepository;
