import { Request, Response } from 'express';

import { ListEstablishmentService, FindOneEstablishmentService, SearchEstablishmentsByName } from '../services';

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

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const findOneEstablishmentService = new FindOneEstablishmentService();

      const response = await findOneEstablishmentService.execute(id);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async searchByName(req: Request, res: Response): Promise<Response> {
    try {
      const { search, city } = req.body;

      const searchEstablishmentsByName = new SearchEstablishmentsByName();

      const response = await searchEstablishmentsByName.execute(search, city);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
