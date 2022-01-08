import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';

import { LoginClientService } from './services/login.service';
import { RefreshTokenService } from './services/refresh-token.service';

export class AuthController extends Controller {
  private readonly loginClientService: LoginClientService;
  private readonly refreshTokenService: RefreshTokenService;

  constructor() {
    super();

    this.loginClientService = new LoginClientService();
    this.refreshTokenService = new RefreshTokenService();

    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.loginClientService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async refresh({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.refreshTokenService.execute(body));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
