import ApiError from '@shared/utils/ApiError';
import { Request, Response } from 'express';

import {
  LoginClientService,
  RecoverPasswordService,
  RefreshTokenService,
  ForgotPasswordService,
} from './services';

import { loginValidate, forgotPasswordValidate } from './validation';
export class AuthController {
  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = loginValidate(body);

      const loginService = new LoginClientService();

      const result = await loginService.execute(sanitizedValues as any);

      return res.json(result.result);
    } catch (err) {
      if(err instanceof ApiError) return res.status(err.statusCode).json(err);

      return res.status(401).json({ message: 'Não autorizado', type: 'auth' });
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

  async setPassword({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = forgotPasswordValidate(body);

      const forgotPasswordService = new ForgotPasswordService();

      const response = await forgotPasswordService.execute(sanitizedValues as any);

      return res.json(response);
    } catch (err) {
      if(err instanceof ApiError) return res.status(err.statusCode).json(err);

      return res.status(400).json({ message: 'Erro ao resetar a senha' });
    }
  }
}
