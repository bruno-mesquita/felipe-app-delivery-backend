import { Request, Response } from 'express';

import { LoginCityManagerService } from './services/login.service';
import { RefreshTokenService } from './services/refresh-token.service';

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginService = new LoginCityManagerService();

      const result = await loginService.execute(req.body);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result.result);
    } catch (err) {
      return res.status(401).json({ err: err.message });
    }
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = new RefreshTokenService();

      const refresh = await refreshToken.execute(req.body);

      if (refresh.err) throw new Error(refresh.err);

      return res.status(200).json(refresh);
    } catch (err) {
      return res.status(403).json({ err: err.message });
    }
  }
}
