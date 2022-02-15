import { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { RegisterProviderNotification } from './services';

class NotificationController extends Controller {
  private readonly registerProviderNotification: RegisterProviderNotification;

  constructor() {
    super();

    this.registerProviderNotification =  new RegisterProviderNotification();

    this.register = this.register.bind(this);
  }

  async register({ body, client }: Request, res: Response): Promise<Response> {
    try {
      await this.registerProviderNotification.execute(
        body.token,
        client.id,
      );

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default NotificationController;
