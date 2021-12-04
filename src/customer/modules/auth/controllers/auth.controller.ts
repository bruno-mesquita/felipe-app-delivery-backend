import { Request, Response } from 'express';

import { LoginClientService } from '../services/token/login.service';
import { RefreshTokenService } from '../services/token/refresh-token.service';

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
      const refreshTokenService = new RefreshTokenService();

      const response = await refreshTokenService.execute(body.refreshToken);

      if (response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return res.status(401).json({ err: err.message });
    }
  }
}
