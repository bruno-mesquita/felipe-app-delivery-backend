import { Request, Response } from 'express';

import { LoginService } from './services';

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginService = new LoginService();

      const result = await loginService.execute(req.body);

      if (result.err) throw new Error(result.err);

      return res.json(result.result);
    } catch (err) {
      return res.status(401).json({ err: err.message });
    }
  }
}

export default AuthController;