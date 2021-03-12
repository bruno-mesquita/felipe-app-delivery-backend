/**
 * @fileoverview Controller da Cidade do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateCityService } from '../services/City/CreateCityService';
import { ListCitiesService } from '../services/City/ListStatesService';

class CityController {
  async list(req: Request, res: Response): Promise<Response> {
    const listCyties = new ListCitiesService();

    const cities = await listCyties.execute();

    return res.json(cities);
  }

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
}

export { CityController };
