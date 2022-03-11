import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { FindProductsByMenuService } from './services';
import { findProductsByMenuValidate } from './validation';

class MenuController extends Controller {
  constructor() {
    super();

    this.findProductsByMenu = this.findProductsByMenu.bind(this);
  }

  async findProductsByMenu({ query, params, headers }: Request, res: Response): Promise<Response> {
    try {
      const findProductsByMenuService = new FindProductsByMenuService();

      const result = await findProductsByMenuService.execute({
        id: Number(params.id),
        page: Number(query.page || 0),
        appVersion: Number.parseFloat((headers.appversion as any) || 1),
      });

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default MenuController;
