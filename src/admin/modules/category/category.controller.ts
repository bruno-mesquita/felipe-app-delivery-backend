import { Request, Response } from 'express';

import { CreateCategoryService } from './services/create-category-service';

class EstablishmentController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService = new CreateCategoryService();

      const category = await categoryService.execute(req.body);

      if (category.err) throw new Error(category.err);

      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
