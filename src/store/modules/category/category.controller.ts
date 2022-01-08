import { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { ListCategoriesService } from './services';

export class CategoryController extends Controller {
  private listCategoriesService: ListCategoriesService;

  constructor() {
    super();

    this.listCategoriesService = new ListCategoriesService();

    this.list = this.list.bind(this);
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const result = await this.listCategoriesService.execute();

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
