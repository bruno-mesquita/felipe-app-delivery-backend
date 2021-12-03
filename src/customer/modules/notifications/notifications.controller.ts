import { Request, Response } from 'express';

import { RegisterProviderNotification } from './services';

class NotificationController {
  async register({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const registerProviderNotification = new RegisterProviderNotification();

      await registerProviderNotification.execute(
        body.token,
        client.id,
      );
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao cadastrar pushToken' })
    }
  }
}

export default NotificationController;
