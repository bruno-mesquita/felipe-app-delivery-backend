import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { ListCategoryService } from './services';

class CategoryController extends Controller {
  constructor() {
    super();

    this.getAll = this.getAll.bind(this);
  }

  async getAll(_: Request, res: Response): Promise<Response> {
    try {
      const listCategoryService = new ListCategoryService();

      const response = await listCategoryService.execute();

      return res.json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default CategoryController;
