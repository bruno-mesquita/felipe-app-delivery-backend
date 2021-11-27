import { Request, Response } from 'express';

import { ListCategoryService } from './services';

class CategoryController {
  async getAll(_: Request, res: Response): Promise<Response> {
    try {
      const listCategoryService = new ListCategoryService();

      const response = await listCategoryService.execute();

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default CategoryController;
