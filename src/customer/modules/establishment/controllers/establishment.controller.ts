import { Request, Response } from 'express';

import { ListEstablishmentService } from '../services';

class EstablishmentController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { city_id, category_id }: any = req.query;

      const listEstablishmentService = new ListEstablishmentService();

      const establishment = await listEstablishmentService.execute(city_id, category_id);

      if (establishment.err) throw new Error(establishment.err);

      return res.status(200).json(establishment);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default EstablishmentController;
