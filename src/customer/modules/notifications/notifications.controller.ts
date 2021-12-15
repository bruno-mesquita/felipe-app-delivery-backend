import Controller from '@shared/utils/controller';
import { Request, Response } from 'express';

import { RegisterProviderNotification } from './services';

class NotificationController extends Controller {
  constructor() {
    super();

    this.register = this.register.bind(this);
  }

  async register({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const registerProviderNotification = new RegisterProviderNotification();

      await registerProviderNotification.execute(
        body.token,
        client.id,
      );

      return res.status(204).json();
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default NotificationController;
