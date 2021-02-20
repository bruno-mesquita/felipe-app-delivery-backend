/**
 * @fileoverview Controller da sessão do Estabelecimento
 *
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { LoginEstablishmentLoginService } from './services/login-service/login-establishment.service';

export class AuthEstablishmentController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginService = new LoginEstablishmentLoginService();

      const result = await loginService.execute(req.body);

      if (result.err) throw new Error(result.err);

      console.log(result);

      return res.json(result.result);
    } catch (err) {
      return res.status(401).json({ err: err.message });
    }
  }
}
