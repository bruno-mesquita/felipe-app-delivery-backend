import { Request, Response } from 'express';

import { ProfileCityManagerService } from './services';

export class CityManagerController {
  async me({ client, body }: Request, res: Response): Promise<Response> {
    try {
      const profileCityManagerService = new ProfileCityManagerService();

      const result = await profileCityManagerService.execute(client.id, body.selects);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: 'Erro' });
    }
  }
}
