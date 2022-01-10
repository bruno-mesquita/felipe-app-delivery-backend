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
  private readonly loginClientService: LoginClientService;
  private readonly refreshTokenService: RefreshTokenService;
  private readonly resetPasswordService: ResetPasswordService;
  private readonly resendCodeService: ResendCodeService;
  private readonly forgotPasswordService: ForgotPasswordService;

  constructor() {
    super();

    this.loginClientService = new LoginClientService();
    this.refreshTokenService = new RefreshTokenService();
    this.resetPasswordService = new ResetPasswordService();
    this.resendCodeService = new ResendCodeService();
    this.forgotPasswordService = new ForgotPasswordService();

    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.resendCode = this.resendCode.bind(this);
  }

  async login({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = loginValidate(body);

      const tokens = await this.loginClientService.execute(sanitizedValues);

      return res.json({ result: tokens });
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async refreshToken({ body }: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.refreshTokenService.execute(body.refreshToken));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async forgotPassword({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = forgotPasswordValidate(body);

      await this.forgotPasswordService.execute(sanitizedValues);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async resetPassword({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = resetPasswordValidate(body);

      await this.resetPasswordService.execute(sanitizedValues);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async resendCode({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = resendCodeValidate(body);

      await this.resendCodeService.execute(sanitizedValues);

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default AuthController;
