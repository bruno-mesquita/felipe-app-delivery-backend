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

  async list({ query }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } = query;

      const { result } = await this.listDeliverymanService.execute(
        Number(page) || 0
      );

      return res.json({ result });
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
