import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { RegisterProviderNotification } from './services';

class NotificationController extends Controller {
  constructor() {
    super(['register']);
  }

  async register({ body, client }: Request, res: Response): Promise<Response> {
    try {
      if (body.token) {
        const registerProviderNotification = new RegisterProviderNotification();

        await registerProviderNotification.execute(body.token, client.id);
      }
      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default NotificationController;
