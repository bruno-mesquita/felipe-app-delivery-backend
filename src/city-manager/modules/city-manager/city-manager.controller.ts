import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { ProfileCityManagerService } from './services';

export class CityManagerController extends Controller {
  private profileCityManagerService: ProfileCityManagerService;

  constructor() {
    super();

    this.profileCityManagerService = new ProfileCityManagerService();

    this.me = this.me.bind(this);
  }

  async me({ client, body }: Request, res: Response): Promise<Response> {
    return this.profileCityManagerService.execute(client.id, body.selects)
    .then(response => res.json(response))
    .catch(err => this.requestError(err, res));
  }
}
