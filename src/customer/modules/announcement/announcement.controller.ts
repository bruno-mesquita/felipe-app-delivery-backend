import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { ListAnnouncementService } from './services';

class AnnouncementController extends Controller {
  constructor() {
    super();

    this.list = this.list.bind(this);
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const listAnnouncementService = new ListAnnouncementService();

      const response = await listAnnouncementService.execute();

      return res.json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default AnnouncementController;
