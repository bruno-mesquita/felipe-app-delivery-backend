import { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  LoginClientService,
  RefreshTokenService,
  ResetPasswordService,
  ResendCodeService,
  ForgotPasswordService,
} from './services';

import {
  loginValidate,
  resetPasswordValidate,
  resendCodeValidate,
  forgotPasswordValidate,
 } from './validation';

class AuthController extends Controller {
  constructor() {
    super();

    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.resendCode = this.resendCode.bind(this);
  }

  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = loginValidate(body);

      const loginService = new LoginClientService();

      const response = await loginService.execute(sanitizedValues as any);

      return res.json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async refreshToken({ body }: Request, res: Response): Promise<Response> {
    try {
      const refreshTokenService = new RefreshTokenService();

      const response = await refreshTokenService.execute(body.refreshToken);

      if (response.err) throw new Error(response.err);

      return res.json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async forgotPassword({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = forgotPasswordValidate(body);

      const forgotPasswordService = new ForgotPasswordService();

      await forgotPasswordService.execute(sanitizedValues);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async resetPassword({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = resetPasswordValidate(body);

      const resetPasswordService = new ResetPasswordService();

      await resetPasswordService.execute(sanitizedValues);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async resendCode({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = resendCodeValidate(body);

      const resendCodeService = new ResendCodeService();

      await resendCodeService.execute(sanitizedValues);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default new AuthController();
