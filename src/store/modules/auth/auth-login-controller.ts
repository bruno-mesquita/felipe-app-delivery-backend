/**
 * @fileoverview Controller da sessão do Estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { LoginEstablishmentLoginService } from './services/login-service/login-establishment.service';
import { RefrishTokenService } from './services/refresh-token.service';

export class AuthEstablishmentController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginService = new LoginEstablishmentLoginService();

      const result = await loginService.execute(req.body);

      if (result.err) throw new Error(result.err);

      return res.json(result.result);
    } catch (err) {
      return res.status(401).json({ err: err.message });
    }
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = new RefrishTokenService();

      const refresh = await refreshToken.execute(req.body.token);

      if (refresh.err) throw new Error(refresh.err);

      return res.status(200).json(refresh);
    } catch (err) {
      return res.status(403).json({ err: err.message });
    }
  }
}
