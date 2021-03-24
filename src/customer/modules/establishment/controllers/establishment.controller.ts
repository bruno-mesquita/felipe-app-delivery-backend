import { Request, Response } from 'express';

import { ListEstablishmentService } from '../services';

class EstablishmentController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId } = req.params;

      const listEstablishmentService = new ListEstablishmentService();

      const response = await listEstablishmentService.execute(categoryId);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
