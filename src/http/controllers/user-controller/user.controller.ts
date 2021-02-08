import { Response } from 'express';
import { JsonController, Post, Body, Res } from 'routing-controllers';
import { container } from 'tsyringe';

import { ICreateUserUseCase } from '@application/use-cases';
import { CreateUserDTO } from '@dtos/user.dto';

@JsonController('/users')
class UserController {
  private createUserUseCase: ICreateUserUseCase;

  constructor() {
    this.createUserUseCase = container.resolve('CreateUserUseCase');
  }

  @Post('/')
  async create(
    @Body() body: CreateUserDTO,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.createUserUseCase.execute(body);

      if (result.err) throw new Error(result.err);

      return res.status(201).json(result.data);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default UserController;
