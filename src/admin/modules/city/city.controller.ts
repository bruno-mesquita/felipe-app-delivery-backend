import { Request, Response } from 'express';

import { CreateCityService, UpdateCityService, ListCitiesService, ListCitiesByStateService } from './services';

class CityController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const cityService = new CreateCityService();

      const city = await cityService.execute(req.body);

      if (city.err) throw new Error(city.err);

      return res.status(201).json(city);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateCityService = new UpdateCityService();

      const city = await updateCityService.execute({ ...req.body, id: req.params.id });

      if (city.err) throw new Error(city.err);

      return res.status(200).json(city);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listCitiesService = new ListCitiesService();

      const result = await listCitiesService.execute();

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async listByState(req: Request, res: Response): Promise<Response> {
    try {
      const listCitiesByStateService = new ListCitiesByStateService();

      const result = await listCitiesByStateService.execute(req.params.stateId);

      if (result.err) throw new Error(result.err);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { CityController };
