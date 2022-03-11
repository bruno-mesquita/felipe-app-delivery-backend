import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { FindOneProductService } from './services';

export class ProductController extends Controller {
  private findOneProductService: FindOneProductService;

  constructor() {
    super(['findOne']);

    this.findOneProductService = new FindOneProductService();
  }

  async findOne({ query, params, headers }: Request, res: Response): Promise<Response> {
    try {
      const product = await this.findOneProductService.execute({
        menuId: Number(query.menuId),
        productId: Number(params.id),
        appVersion: Number.parseFloat((headers.apiversion as any) || 1),
      });

      return res.json(product);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
