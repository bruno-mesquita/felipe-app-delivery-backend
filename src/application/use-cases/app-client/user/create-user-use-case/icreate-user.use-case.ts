import { CreateUserDTO } from '@dtos/user.dto';

export interface ICreateUserUseCase {
  execute(model: CreateUserDTO): Promise<{ data: string; err: string | null }>;
}
