import Controller from '@shared/utils/controller';
import type { Request, Response } from 'express';

import { ListDeliverymanService } from './services';

export class DeliverymanController extends Controller {
  private readonly listDeliverymanService: ListDeliverymanService;

  constructor() {
    super();

    this.listDeliverymanService = new ListDeliverymanService();

    this.list = this.list.bind(this);
  }

  async list({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } = query;

      const data = await this.listDeliverymanService.execute({
        page: Number(page),
        establishmentId: client.entity.getEstablishmentId(),
      });

      return res.json({ result: data });
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
