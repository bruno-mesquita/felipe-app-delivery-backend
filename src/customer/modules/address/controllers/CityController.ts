/**
 * @fileoverview Controller da Cidade do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateCityService } from '../services/CreateCityService';

class StateController {
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

export { StateController };
