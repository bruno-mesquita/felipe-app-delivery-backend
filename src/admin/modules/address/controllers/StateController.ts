/**
 * @fileoverview Controller do Estado do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateStateService } from '../services/CreateStateService';
import { ListStatesService } from '../../../../customer/modules/address/services/ListCitiesByStateService';

class StateController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const stateService = new CreateStateService();

      const state = await stateService.execute(req.body);

      if (state.err) throw new Error(state.err);

      return res.status(201).json(state);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { StateController };
