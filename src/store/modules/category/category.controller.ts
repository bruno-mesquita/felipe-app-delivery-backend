import { Request, Response } from 'express';

import { ListCategoriesService } from './services';

export class CategoryController {
  async list(_: Request, res: Response): Promise<Response> {
    try {
      const listCategoriesService = new ListCategoriesService();

      const categories = await listCategoriesService.execute();

      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
