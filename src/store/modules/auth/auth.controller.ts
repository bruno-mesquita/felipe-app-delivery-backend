/**
 * @fileoverview Controller da sessão do Estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { LoginEstablishmentOwnerService } from './services/login-service/login-establishment-owner.service';
import { RefreshTokenService } from './services';
import Controller from '@shared/utils/controller';

export class AuthEstablishmentController extends Controller {
  private loginEstablishmentOwnerService: LoginEstablishmentOwnerService;
  private refreshTokenService: RefreshTokenService;

  constructor() {
    super();

    this.loginEstablishmentOwnerService = new LoginEstablishmentOwnerService();
    this.refreshTokenService = new RefreshTokenService();

    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      const result = await this.loginEstablishmentOwnerService.execute(body);

      return res.json(result);
    } catch (err) {
      throw this.requestError(err, res);
    }
  }

  async refresh({ body }: Request, res: Response): Promise<Response> {
    try {
      const result = await this.refreshTokenService.execute(body.token);

      return res.json(result);
    } catch (err) {
      throw this.requestError(err, res);
    }
  }
}
