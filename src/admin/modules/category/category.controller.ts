import { Request, Response } from 'express';

import { CreateCategoryService, ListCategoriesService } from './services';
import { UpdateCategoryService } from './services/update-category-service/update-category.service';

class EstablishmentController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updateCategoryService = new UpdateCategoryService();

      const category = await updateCategoryService.execute({ ...req.body, id });

      if (category.err) throw new Error(category.err);

      return res.status(200).json(category);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

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

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listCategoriesService = new ListCategoriesService();

      const categories = await listCategoriesService.execute();

      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
