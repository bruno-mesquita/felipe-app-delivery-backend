import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { FindOneProductService } from './services';

export class ProductController extends Controller {
  private findOneProductService: FindOneProductService;

  constructor() {
    super(['findOne']);

    this.findOneProductService = new FindOneProductService();
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.findOneProductService.execute({
        menuId: Number(req.query.menuId),
        productId: Number(req.params.id),
      });

      return res.json(product);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
