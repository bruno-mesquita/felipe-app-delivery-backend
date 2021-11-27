import { Request, Response } from 'express';

import { LoginClientService } from '../services/token/login.service';
import { RefrishTokenService } from '../services/token/refresh-token.service';

export class AuthController {
  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      const loginService = new LoginClientService();

      const result = await loginService.execute(body);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result.result);
    } catch (err) {
      return res.status(401).json({ err: err.message });
    }
  }

  async refresh({ body }: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = new RefrishTokenService();

      const refresh = await refreshToken.execute(body);

      if (refresh.err) throw new Error(refresh.err);

      return res.status(200).json(refresh);
    } catch (err) {
      return res.status(403).json({ err: err.message });
    }
  }
}
