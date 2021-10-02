import { Request, Response } from 'express';

import { ProfileCityManagerService } from './services';

export class CityManagerController {
  async me(req: Request, res: Response): Promise<Response> {
    try {
      const profileCityManagerService = new ProfileCityManagerService();

      const result = await profileCityManagerService.execute(req.client.id, req.body.selects);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: 'Erro' });
    }
  }
}
