import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { LoginCityManagerService, RefreshTokenService } from './services';
import { loginValidate, refreshTokenValidate } from './validations';

class AuthController extends Controller {
  constructor() {
    super();

    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      const values = loginValidate(body);

      const loginService = new LoginCityManagerService();

      return res.json(await loginService.execute(values));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async refresh({ body }: Request, res: Response): Promise<Response> {
    try {
      const values = refreshTokenValidate(body);

      const refreshToken = new RefreshTokenService();

      return res.json(await refreshToken.execute(values));
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default AuthController;
