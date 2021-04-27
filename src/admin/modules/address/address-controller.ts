import { ListCitiesByStatesService } from './services/list-cities-by-state-service';
import { Request, Response } from 'express';

export class AddressEstablishmentController {
  async listCitiesByState(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const listCitiesByStatesService = new ListCitiesByStatesService();

      const listCities = await listCitiesByStatesService.execute(Number(id));

      if (listCities.err) throw new Error(listCities.err);

      return res.status(200).json(listCities);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
