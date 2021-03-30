import { Request, Response } from 'express';

import { ListEstablishmentService, FindOneEstablishmentService, SearchEstablishmentsByName } from './services';

class EstablishmentController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { city_id, category_id }: any = req.query;

      const listEstablishmentService = new ListEstablishmentService();

      const response = await listEstablishmentService.execute(city_id, category_id);

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

      if (response.err) throw new Error(response.err);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
