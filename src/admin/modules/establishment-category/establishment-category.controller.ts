import { Request, Response } from 'express';

import { CreateEstablishmentCategoryService, ListEstablishmentCategoryService } from './services';

class EstablishmentController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const listEstablishmentCategoryService = new CreateEstablishmentCategoryService();

      const response = await listEstablishmentCategoryService.execute(req.body);

      return res.status(201).json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const listEstablishmentCategoryService = new ListEstablishmentCategoryService();

      const response = await listEstablishmentCategoryService.execute();

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
