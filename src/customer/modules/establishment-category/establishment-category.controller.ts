import { Request, Response } from 'express';

import { ListEstablishmentCategoryService } from './services';

class EstablishmentController {
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
