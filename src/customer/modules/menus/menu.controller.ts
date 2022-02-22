import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { FindProductsByMenuService } from './services';
import { findProductsByMenuValidate } from './validation';

class MenuController extends Controller {
  constructor() {
    super();

    this.findProductsByMenu = this.findProductsByMenu.bind(this);
  }

  async findProductsByMenu(
    { query, params }: Request,
    res: Response
  ): Promise<Response> {
    try {
      const values = findProductsByMenuValidate({
        id: Number(params.id),
        page: Number(query.page),
      });

      const findProductsByMenuService = new FindProductsByMenuService();

      const result = await findProductsByMenuService.execute(values);

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default MenuController;
