import { Request, Response } from 'express';
import { CreateCityService, UpdateCityService } from './services';

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

      return res.status(201).json(city);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { CityController };
