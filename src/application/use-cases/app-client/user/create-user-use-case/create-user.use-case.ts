import { inject, injectable } from 'tsyringe';

import { CreateUserDTO } from '@dtos/user.dto';
import { IUserRepository } from '@application/repositories';
import { ICreateUserUseCase } from './icreate-user.use-case';

@injectable()
class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(
    model: CreateUserDTO
  ): Promise<{ data: string; err: string | null }> {
    try {
      const user = await this.userRepository.create(model);

      return { data: user.getId(), err: null };
    } catch (err) {
      return { data: '', err: err.message };
    }
  }
}

export default CreateUserUseCase;
