import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { ListFreightsService } from './services';

export class FreightController extends Controller {
  private listFreightsService: ListFreightsService;

  constructor() {
    super(['list']);
    this.listFreightsService = new ListFreightsService();
  }

  async list({ query }: Request, res: Response) {
    try {
      const freights = await this.listFreightsService.execute({
        establishmentId: Number(query.establishmentId),
      });

      return res.json(freights);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
